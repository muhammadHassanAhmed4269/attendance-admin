const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class UpdateUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updateRole(req, res) {
    try {
      const roleToUpdate = await this.repository.findOne(req.query);

      if (isNotFound(roleToUpdate)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.roles.error.notFound
        );
      }

      const updatedRole = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );

      if (!updatedRole) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.roles.error.updateNotFound
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.roles.success.update,
        updatedRole
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.roles.error.update
      );
    }
  }
}

module.exports = UpdateUseCase;
