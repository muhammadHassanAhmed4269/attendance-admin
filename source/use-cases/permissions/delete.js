const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DeleteUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deletePermission(req, res) {
    try {
      const permission = await this.repository.findOne(req.query);

      if (isNotFound(permission)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.permissions.error.notFound
        );
      }

      const deletedPermission = await this.repository.findOneAndDelete(
        req.query
      );
      if (!deletedPermission) {
        return apiResponseHelper(
          res,
          customStatuses.internalServerError,
          projectMessages.permissions.error.deletionFailed
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.permissions.success.delete,
        deletedPermission
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.permissions.error.delete
      );
    }
  }
}

module.exports = DeleteUseCase;
