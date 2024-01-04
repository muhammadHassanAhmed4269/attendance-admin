const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const customStatuses = require("../../configurations/custom-statuses");
const environmentVariables = require("../../configurations/environment-variables");
const { isNotFound } = require("entity-checker");

class AuthUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await this.repository.findOne({ email, password });

      if (isNotFound(user)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          "Invalid credentials"
        );
      }

      const payload = {
        _id: user._id,
      };

      const secretKey = environmentVariables.secretKeys.jwtSecret;
      const options = { expiresIn: "1h" };

      const token = jwt.sign(payload, secretKey, options);

      res.cookie("jwt", token, { maxAge: 3600000 });

      return apiResponseHelper(
        res,
        customStatuses.ok,
        "Logged in successfully",
        token
      );
    } catch (error) {
      return handleInternalServerError(res, error);
    }
  }

  async logout(req, res) {
    try {
      res.clearCookie("jwt");
      return res.redirect("/");
    } catch (error) {
      return handleInternalServerError(res, error);
    }
  }
}

function handleInternalServerError(res, error) {
  console.error(error);
  return apiResponseHelper(
    res,
    customStatuses.internalServerError,
    "Something went wrong"
  );
}

module.exports = AuthUseCase;
