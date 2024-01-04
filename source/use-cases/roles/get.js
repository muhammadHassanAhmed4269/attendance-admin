const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getRole(req, res) {
    try {
      const role = await this.repository.findOne(req.query);

      if (isNotFound(role)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.roles.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.roles.success.get,
        role
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.roles.error.fetchFailure
      );
    }
  }
}

module.exports = GetUseCase;
