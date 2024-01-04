const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class UpdateUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updatePermission(req, res) {
    try {
      const permission = await this.repository.findOne(req.query);

      if (isNotFound(permission)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.permissions.error.notFound
        );
      }

      const updatedPermission = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );

      if (!updatedPermission) {
        return apiResponseHelper(
          res,
          customStatuses.internalServerError,
          projectMessages.permissions.error.updateFailed
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.permissions.success.update,
        updatedPermission
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.permissions.error.update
      );
    }
  }
}

module.exports = UpdateUseCase;
