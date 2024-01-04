const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DesignationUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteDesignation(req, res) {
    try {
      const designation = await this.repository.findOne(req.query);

      if (isNotFound(designation)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.designations.error.notFound
        );
      }

      const deletedDesignation = await this.repository.findOneAndDelete(
        req.query
      );
      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.designations.success.delete,
        deletedDesignation
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.designations.error.delete
      );
    }
  }
}

module.exports = DesignationUseCase;
