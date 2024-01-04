const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class AddNewUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewShift(req, res) {
    try {
      const shift = await this.repository.findOne(req.body);

      if (isNotFound(shift)) {
        const newShift = await this.repository.create(req.body);
        return apiResponseHelper(
          res,
          customStatuses.created,
          projectMessages.shifts.success.addNew,
          newShift
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.conflict,
        projectMessages.shifts.error.alreadyExists,
        shift
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.shifts.error.addNew
      );
    }
  }
}

module.exports = AddNewUseCase;
