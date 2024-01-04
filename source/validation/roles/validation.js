const { query, body, validationResult } = require("express-validator");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const customStatuses = require("../../configurations/custom-statuses");
const customMessages = require("../../configurations/custom-messages");
const validationMessages = require("../../configurations/validation-messages");

const getList = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleName),
];

const get = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleName),
];

const addNew = [
  body("name")
    .notEmpty()
    .withMessage(validationMessages.roles.roleNameRequired)
    .isString()
    .withMessage(validationMessages.roles.invalidRoleName),
  body("permissions")
    .optional()
    .isArray()
    .withMessage(validationMessages.roles.invalidPermissions),
];

const update = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleName),
  body("name")
    .notEmpty()
    .withMessage(validationMessages.roles.roleNameRequired)
    .isString()
    .withMessage(validationMessages.roles.invalidRoleName),
  body("permissions")
    .optional()
    .isArray()
    .withMessage(validationMessages.roles.invalidPermissions),
];

const remove = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.roles.invalidRoleName),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  const errorMessages = errors
    .array()
    .slice(0, 1)
    .map((err) => err.msg);

  return apiResponseHelper(
    res,
    customStatuses.unprocessableEntity,
    customMessages.unprocessableEntity,
    { errors: errorMessages }
  );
};

module.exports = { getList, get, addNew, update, remove, validate };
