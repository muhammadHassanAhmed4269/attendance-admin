const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class PermissionUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewPermission(req, res) {
    try {
      const existingPermission = await this.repository.findOne(req.body);

      if (isNotFound(existingPermission)) {
        const newPermission = await this.repository.create(req.body);
        return apiResponseHelper(
          res,
          customStatuses.created,
          projectMessages.permissions.success.addNew,
          newPermission
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.conflict,
        projectMessages.permissions.error.alreadyExists,
        existingPermission
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.permissions.error.addNew
      );
    }
  }
}

module.exports = PermissionUseCase;
