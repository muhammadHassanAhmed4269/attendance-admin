const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DeleteUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteHoliday(req, res) {
    try {
      const holiday = await this.repository.findOne(req.query);

      if (isNotFound(holiday)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.holidays.error.get
        );
      }

      const deletedHoliday = await this.repository.findOneAndDelete(req.query);
      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.holidays.success.delete,
        deletedHoliday
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.holidays.error.delete
      );
    }
  }
}

module.exports = DeleteUseCase;
