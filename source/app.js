// environment variables
require("dotenv").config();

// packages
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const http = require("http");
const path = require("path");
const hbs = require("hbs");

// configurations
const environmentVariables = require("./configurations/environment-variables");
const checkTokenMiddleware = require("./interfaces/middlewares/auth");
const roleBasedAuthorization = require("./interfaces/middlewares/rbac-authorization");

// create app
const app = express();
// console.log();
// views path
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../frontend/views"));

// public path
app.use(express.static(path.join(__dirname, "../assets")));
app.use("/css", express.static(path.join(__dirname, "../assets/css")));
app.use("/fonts", express.static(path.join(__dirname, "../assets/fonts")));
app.use("/js", express.static(path.join(__dirname, "../assets/js")));
app.use("/img", express.static(path.join(__dirname, "../assets/img")));
app.use("/vendors", express.static(path.join(__dirname, "../assets/vendors")));
app.use("/uploads", express.static(path.join(__dirname, "../assets/uploads")));
app.use("/scripts", express.static(path.join(__dirname, "../assets/scripts")));
app.use("/auth", express.static(path.join(__dirname, "../assets/auth")));

// hbs helpers
hbs.registerPartials(path.join(__dirname, "../frontend/partials"));
hbs.registerHelper("compare", function (lvalue, operator, rvalue, options) {
  const operators = {
    "==": function (l, r) {
      return l == r;
    },
    "===": function (l, r) {
      return l === r;
    },
    "!=": function (l, r) {
      return l != r;
    },
    "!==": function (l, r) {
      return l !== r;
    },
    "<": function (l, r) {
      return l < r;
    },
    ">": function (l, r) {
      return l > r;
    },
    "<=": function (l, r) {
      return l <= r;
    },
    ">=": function (l, r) {
      return l >= r;
    },
    typeof: function (l, r) {
      return typeof l === r;
    },
  };

  if (!operators[operator]) {
    throw new Error(
      `Handlerbars Helper 'compare' doesn't know the operator ${operator}`
    );
  }

  const result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});
hbs.registerHelper("JSONstringify", function (context) {
  return JSON.stringify(context);
});

// middlewares
const thirtyDays = 30 * 24 * 60 * 60 * 1000;
app.use(
  session({
    secret: environmentVariables.secretKeys.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: thirtyDays },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// application pages routes
const dashboardPages = require("./dependency-injections/pages/dashboard");
const permissionPages = require("./dependency-injections/pages/permissions");
const rolePages = require("./dependency-injections/pages/roles");
const designationPages = require("./dependency-injections/pages/designations");
const departmentPages = require("./dependency-injections/pages/departments");
const unitPages = require("./dependency-injections/pages/units");
const shiftPages = require("./dependency-injections/pages/shifts");
const employeePages = require("./dependency-injections/pages/employees");
const authPages = require("./dependency-injections/pages/auth");
const attendancesPages = require("./dependency-injections/pages/attendances");
const holidaysPages = require("./dependency-injections/pages/holidays");
// application apis routes
const permissionRoutes = require("./dependency-injections/permissions/injections");
const roleRoutes = require("./dependency-injections/roles/injections");
const designationRoutes = require("./dependency-injections/designations/injections");
const departmentRoutes = require("./dependency-injections/departments/injections");
const unitRoutes = require("./dependency-injections/units/injections");
const shiftRoutes = require("./dependency-injections/shifts/injections");
const employeeRoutes = require("./dependency-injections/employees/injections");
const authRoutes = require("./dependency-injections/auth/injections");
const attendancesRoutes = require("./dependency-injections/attendances/injections");
const holidaysRoutes = require("./dependency-injections/holidays/injections");

app.use(authPages);
app.use(authRoutes);

// app.use(checkTokenMiddleware);

// app.use(roleBasedAuthorization);

app.use((req, res, next) => {
  if (req.user) {
    res.locals.permissions = req.permissions;
    return next();
  }
  return next();
});

app.use(dashboardPages);
app.use(permissionPages);
app.use(rolePages);
app.use(designationPages);
app.use(departmentPages);
app.use(unitPages);
app.use(shiftPages);
app.use(employeePages);
app.use(attendancesPages);
app.use(holidaysPages);

app.use(permissionRoutes);
app.use(roleRoutes);
app.use(designationRoutes);
app.use(departmentRoutes);
app.use(unitRoutes);
app.use(shiftRoutes);
app.use(employeeRoutes);
app.use(attendancesRoutes);
app.use(holidaysRoutes);

// create server
const server = http.createServer(app);
const dbConnector = require("./configurations/database");
server.listen(environmentVariables.application.port, () => {
  dbConnector;
  console.log("Server live at " + environmentVariables.application.port);
});
