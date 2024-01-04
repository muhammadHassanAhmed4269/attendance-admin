const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DepartmentUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteDepartment(req, res) {
    try {
      const department = await this.repository.findOne(req.query);

      if (isNotFound(department)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.departments.error.notFound
        );
      }

      const deletedDepartment = await this.repository.findOneAndDelete(
        req.query
      );
      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.departments.success.delete,
        deletedDepartment
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.departments.error.delete
      );
    }
  }
}

module.exports = DepartmentUseCase;
