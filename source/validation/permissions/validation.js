const { isNotFound } = require("entity-checker");
const { query, body, validationResult } = require("express-validator");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const customStatuses = require("../../configurations/custom-statuses");
const customMessages = require("../../configurations/custom-messages");
const validationMessages = require("../../configurations/validation-messages");

const getList = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionName),
];

const get = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionName),
];

const addNew = [
  body("name")
    .toLowerCase()
    .notEmpty()
    .withMessage(validationMessages.permissions.permissionNameRequired)
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionName),
];

const update = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionName),
  body("name")
    .notEmpty()
    .withMessage(validationMessages.permissions.permissionNameRequired)
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionName),
];

const remove = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.permissions.invalidPermissionName),
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
