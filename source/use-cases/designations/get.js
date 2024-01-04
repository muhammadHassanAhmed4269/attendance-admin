const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getDesignation(req, res) {
    try {
      const designation = await this.repository.findOne(
        req.query,
        null,
        "roles"
      );

      if (isNotFound(designation)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.designations.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.designations.success.get,
        designation
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.designations.error.fetchFailure
      );
    }
  }
}

module.exports = GetUseCase;
