const { isNotFound } = require("entity-checker");

const isLoggedIn = (req, res, next) => {
  if (isNotFound(req.cookies.jwt)) {
    return next();
  } else {
    return res.redirect("/dashboard");
  }
};

module.exports = isLoggedIn;
