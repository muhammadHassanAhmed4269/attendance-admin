const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DepartmentUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewDepartment(req, res) {
    try {
      const existingDepartment = await this.repository.findOne(req.body);

      if (isNotFound(existingDepartment)) {
        const newDepartment = await this.repository.create(req.body);
        return apiResponseHelper(
          res,
          customStatuses.created,
          projectMessages.departments.success.addNew,
          newDepartment
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.conflict,
        projectMessages.departments.error.alreadyExists,
        existingDepartment
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.departments.error.addNew
      );
    }
  }
}

module.exports = DepartmentUseCase;
