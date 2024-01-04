const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getShift(req, res) {
    try {
      const shift = await this.repository.findOne(req.query);

      if (isNotFound(shift)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.shifts.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.shifts.success.get,
        shift
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.shifts.error.fetchFailure
      );
    }
  }
}

module.exports = GetUseCase;
