const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DeleteUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteRole(req, res) {
    try {
      const roleToDelete = await this.repository.findOne(req.query);

      if (isNotFound(roleToDelete)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.roles.error.notFound
        );
      }

      const deletedRole = await this.repository.findByIdAndDelete(roleId);
      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.roles.success.delete,
        deletedRole
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.roles.error.delete
      );
    }
  }
}

module.exports = DeleteUseCase;
