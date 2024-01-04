const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class AddNewUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewRole(req, res) {
    try {
      const existingRole = await this.repository.findOne(req.body);

      if (!isNotFound(existingRole)) {
        return apiResponseHelper(
          res,
          customStatuses.conflict,
          projectMessages.roles.error.alreadyExists,
          existingRole
        );
      }

      const newRole = await this.repository.create(req.body);
      return apiResponseHelper(
        res,
        customStatuses.created,
        projectMessages.roles.success.addNew,
        newRole
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.roles.error.addNew
      );
    }
  }
}

module.exports = AddNewUseCase;
