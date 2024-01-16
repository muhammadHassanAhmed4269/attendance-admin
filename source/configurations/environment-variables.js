require("dotenv").config();

const environmentVariables = {
  application: {
    port: process.env.PORT,
  },
  secretKeys: {
    jwtSecret: process.env.JWT_SECRET,
    sessionSecret: process.env.SESSION_SECRET,
  },
  database: {
    url: process.env.MONGODB_URL,
  },
  smtpCredentials: {
    email: process.env.APP_EMAIL,
    password: process.env.APP_PASSWORD,
  },
};

module.exports = environmentVariables;
