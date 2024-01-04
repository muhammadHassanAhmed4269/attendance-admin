const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getPermission(req, res) {
    try {
      const permission = await this.repository.findOne(req.query);

      if (isNotFound(permission)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.permissions.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.permissions.success.get,
        permission
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.permissions.error.fetchFailure
      );
    }
  }
}

module.exports = GetUseCase;
