const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetListUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getUnits(req, res) {
    try {
      const units = await this.repository.find(req.query);

      if (isNotFound(units)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.units.error.getList
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.units.success.getList,
        units
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.units.error.listFetchFailure
      );
    }
  }
}

module.exports = GetListUseCase;
