const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class DepartmentUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updateDepartment(req, res) {
    try {
      const department = await this.repository.findOne(req.query);

      if (isNotFound(department)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.departments.error.notFound
        );
      }

      const updatedDepartment = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );

      if (isNotFound(updatedDepartment)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.departments.error.updateNotFound
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.departments.success.update,
        updatedDepartment
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.departments.error.update
      );
    }
  }
}

module.exports = DepartmentUseCase;
