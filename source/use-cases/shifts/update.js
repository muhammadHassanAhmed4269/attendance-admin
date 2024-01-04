const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class UpdateUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updateShift(req, res) {
    try {
      const updatedShift = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );

      if (isNotFound(updatedShift)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.shifts.error.updateNotFound
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.shifts.success.update,
        updatedShift
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.shifts.error.update
      );
    }
  }
}

module.exports = UpdateUseCase;
