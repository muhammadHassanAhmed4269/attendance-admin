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
    .withMessage(validationMessages.designations.invalidDesinationId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesignationName),
];

const get = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesinationId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesignationName),
];

const addNew = [
  body("name")
    .notEmpty()
    .withMessage(validationMessages.designations.designationNameRequired)
    .isString()
    .withMessage(validationMessages.designations.invalidDesignationName),
  body("roles")
    .notEmpty()
    .isArray()
    .withMessage(validationMessages.designations.rolesRequired)
    .withMessage(validationMessages.designations.invalidRoles),
];

const update = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesinationId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesignationName),
  body("name")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesignationName),
];

const remove = [
  query("_id")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesinationId),
  query("name")
    .optional()
    .isString()
    .withMessage(validationMessages.designations.invalidDesignationName),
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
