const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class HolidayUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updateHoliday(req, res) {
    try {
      const holiday = await this.repository.findOne(req.query);

      if (isNotFound(holiday)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.holidays.error.notFound
        );
      }

      const updatedHoliday = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );

      if (isNotFound(updatedHoliday)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.holidays.error.updateNotFound
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.holidays.success.update,
        updatedHoliday
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.holidays.error.update
      );
    }
  }
}

module.exports = HolidayUseCase;
