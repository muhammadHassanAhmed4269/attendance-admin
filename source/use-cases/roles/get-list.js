const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class GetListUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getRoles(req, res) {
    try {
      const roles = await this.repository.find(req.query);

      if (isNotFound(roles)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.roles.error.getList
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.roles.success.getList,
        roles
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.roles.error.listFetchFailure
      );
    }
  }
}

module.exports = GetListUseCase;
