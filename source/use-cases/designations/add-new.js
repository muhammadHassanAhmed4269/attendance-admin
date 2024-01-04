const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DesignationUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewDesignation(req, res) {
    try {
      const existingDesignation = await this.repository.findOne({
        name: req.body.name,
      });

      if (isNotFound(existingDesignation)) {
        const newDesignation = await this.repository.create(req.body);
        return apiResponseHelper(
          res,
          customStatuses.created,
          projectMessages.designations.success.addNew,
          newDesignation
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.conflict,
        projectMessages.designations.error.alreadyExists,
        existingDesignation
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.designations.error.addNew
      );
    }
  }
}

module.exports = DesignationUseCase;
