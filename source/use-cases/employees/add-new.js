const { isNotFound } = require("entity-checker");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const projectMessages = require("../../configurations/project-messages");

class EmployeeUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async addNewEmployee(req, res) {
    try {
      const existingEmployee = await this.repository.findOne({
        email: req.body.email,
      });

      if (isNotFound(existingEmployee)) {
        const formData = {
          fullName: req.body.fullName,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.file,
          mobileNumber: req.body.mobileNumber,
          emergencyNumber: req.body.emergencyNumber,
          nicNumber: req.body.nicNumber,
          nicFrontPicture: req.file,
          nicBackPicture: req.file,
          nextToKin: req.body.nextToKin,
          relationToKin: req.body.relationToKin,
          homeAddress1: req.body.homeAddress1,
          homeAddress2: req.body.homeAddress2,
          cv: req.file,
          unit: [req.body.selectedUnit],
          department: [req.body.selectedDepartment],
          designation: [req.body.selectedDesignation],
          role: [req.body.selectedRole],
          shift: req.body.selectedShift,
          grossSalary: req.body.grossSalary,
          basicSalary: req.body.basicSalary,
          houseRent: req.body.houseRent,
          utility: req.body.utility,
          medicalAllowance: req.body.medicalAllowance,
          taxableAmount: req.body.taxableAmount,
          incomeTax: req.body.incomeTax,
          eobi: req.body.eobi,
          bankCharges: req.body.bankCharges,
        };
        const newEmployee = await this.repository.create(formData);
        return apiResponseHelper(
          res,
          customStatuses.created,
          projectMessages.employees.success.addNew,
          newEmployee
        );
      }

      return apiResponseHelper(
        res,
        customStatuses.conflict,
        projectMessages.employees.error.alreadyExists,
        existingEmployee
      );
    } catch (error) {
      console.error(error);
      return apiResponseHelper(
        res,
        customStatuses.internalServerError,
        projectMessages.employees.error.addNew
      );
    }
  }
}

module.exports = EmployeeUseCase;
