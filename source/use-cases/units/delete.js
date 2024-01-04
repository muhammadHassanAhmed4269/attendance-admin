const { customStatuses } = require("../../configurations/custom-statuses");
const {
  apiResponseHelper,
} = require("../../dependency-injections/utilities/api-response");
const { projectMessages } = require("../../configurations/project-messages");
const { isNotFound } = require("entity-checker");

class DeleteUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteUnit(req, res) {
    try {
      const deletedUnit = await this.repository.findOneAndDelete(req.query);

      if (isNotFound(deletedUnit)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.units.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.units.success.delete,
        deletedUnit
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.units.error.delete
      );
    }
  }
}

module.exports = DeleteUseCase;
