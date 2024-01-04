const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DeleteUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteShift(req, res) {
    try {
      const deletedShift = await this.repository.findOneAndDelete(req.query);

      if (isNotFound(deletedShift)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.shifts.error.get
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.shifts.success.delete,
        deletedShift
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.shifts.error.delete
      );
    }
  }
}

module.exports = DeleteUseCase;
