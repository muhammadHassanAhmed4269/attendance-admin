const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetListUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getDepartments(req, res) {
    try {
      const departments = await this.repository.find(req.query);

      if (isNotFound(departments)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.departments.error.getList
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.departments.success.getList,
        departments
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.departments.error.listFetchFailure
      );
    }
  }
}

module.exports = GetListUseCase;
