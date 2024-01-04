const jwt = require("jsonwebtoken");
const Employee = require("../../models/employees/schema");
const Role = require("../../models/roles/schema");
const environmentVariables = require("../../configurations/environment-variables");
const { isNotFound } = require("entity-checker");

const checkTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const decoded = jwt.verify(
      token,
      environmentVariables.secretKeys.jwtSecret
    );

    const admin = await Employee.findOne({ _id: decoded._id }).populate("role");

    if (isNotFound(admin)) {
      return res.redirect("/");
    }

    req.user = admin;
    return next();
  } catch (error) {
    // console.error(error);
    return res.redirect("/");
  }
};

module.exports = checkTokenMiddleware;
