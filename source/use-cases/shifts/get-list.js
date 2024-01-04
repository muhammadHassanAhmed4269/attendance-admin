const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetListUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getShifts(req, res) {
    try {
      const shifts = await this.repository.find(req.query);

      if (isNotFound(shifts)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.shifts.error.getList
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.shifts.success.getList,
        shifts
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.shifts.error.listFetchFailure
      );
    }
  }
}

module.exports = GetListUseCase;
