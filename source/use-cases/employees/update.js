const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class EmployeeUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async updateEmployee(req, res) {
    try {
      const employee = await this.repository.findOne(req.query);

      if (isNotFound(employee)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.employees.error.notFound
        );
      }

      const updatedEmployee = await this.repository.findOneAndUpdate(
        req.query,
        req.body,
        { new: true }
      );
      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.employees.success.update,
        updatedEmployee
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.employees.error.update
      );
    }
  }
}

module.exports = EmployeeUseCase;
