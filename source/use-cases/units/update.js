const { customStatuses } = require("../../configurations/custom-statuses");
const {
  apiResponseHelper,
} = require("../../dependency-injections/utilities/api-response");
const { projectMessages } = require("../../configurations/project-messages");
const { isNotFound } = require("entity-checker");

class UpdateUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updateUnit(req, res) {
    try {
      const updatedUnit = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );

      if (isNotFound(updatedUnit)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.units.error.updateNotFound
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.units.success.update,
        updatedUnit
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.units.error.update
      );
    }
  }
}

module.exports = UpdateUseCase;
