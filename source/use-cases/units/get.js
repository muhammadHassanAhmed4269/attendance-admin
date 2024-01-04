const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getUnit(req, res) {
    try {
      const unit = await this.repository.findOne(
        req.query,
        null,
        "departments"
      );

      if (isNotFound(unit)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.units.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.units.success.get,
        unit
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.units.error.fetchFailure
      );
    }
  }
}

module.exports = GetUseCase;
