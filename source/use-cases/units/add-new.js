const customStatuses = require("../../configurations/custom-statuses");
const {
  apiResponseHelper,
} = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");
const { isNotFound } = require("entity-checker");

class AddNewUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewUnit(req, res) {
    try {
      const newUnit = await this.repository.create(req.body);

      if (isNotFound(newUnit)) {
        return apiResponseHelper(
          res,
          customStatuses.internalServerError,
          projectMessages.units.error.addNew
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.created,
        projectMessages.units.success.addNew,
        newUnit
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.units.error.addNew
      );
    }
  }
}

module.exports = AddNewUseCase;
