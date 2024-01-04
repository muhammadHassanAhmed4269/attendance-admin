const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getDepartment(req, res) {
    try {
      const department = await this.repository.findOne(
        req.query,
        null,
        "designations"
      );

      if (isNotFound(department)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.departments.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.departments.success.get,
        department
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.departments.error.fetchFailure
      );
    }
  }
}

module.exports = GetUseCase;
