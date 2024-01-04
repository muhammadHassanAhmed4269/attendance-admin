const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class HolidayUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewHoliday(req, res) {
    try {
      const holiday = await this.repository.findOne(req.body);

      if (isNotFound(holiday)) {
        const newHoliday = await this.repository.create(req.body);
        return apiResponseHelper(
          res,
          customStatuses.created,
          projectMessages.holidays.success.addNew,
          newHoliday
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.conflict,
        projectMessages.holidays.error.alreadyExists,
        holiday
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.holidays.error.addNew
      );
    }
  }
}

module.exports = HolidayUseCase;
