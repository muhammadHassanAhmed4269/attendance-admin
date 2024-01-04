const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DesignationUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updateDesignation(req, res) {
    try {
      const designation = await this.repository.findOne(req.query);

      if (isNotFound(designation)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.designations.error.notFound
        );
      }

      const updatedDesignation = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );

      if (isNotFound(updatedDesignation)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.designations.error.updateNotFound
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.designations.success.update,
        updatedDesignation
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.designations.error.update
      );
    }
  }
}

module.exports = DesignationUseCase;
