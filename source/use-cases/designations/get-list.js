const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetListUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getDesignations(req, res) {
    try {
      const designations = await this.repository.find(req.query);

      if (isNotFound(designations)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.designations.error.getList
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.designations.success.getList,
        designations
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.designations.error.listFetchFailure
      );
    }
  }
}

module.exports = GetListUseCase;
