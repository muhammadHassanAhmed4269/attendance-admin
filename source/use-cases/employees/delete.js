const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class EmployeeUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async deleteEmployee(req, res) {
    try {
      const employeeId = req.query._id;

      const employee = await this.repository.findOne({ _id: employeeId });

      if (isNotFound(employee)) {
        return apiResponseHelper(
          res,
          customStatuses.notFound,
          projectMessages.employees.error.notFound
        );
      }

      const deletedEmployee = await this.repository.findOneAndDelete(req.query);
      return apiResponseHelper(
        res,
        customStatuses.ok,
        projectMessages.employees.success.delete,
        deletedEmployee
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.employees.error.delete
      );
    }
  }
}

module.exports = EmployeeUseCase;
