const customMessages = require("../../../configurations/custom-messages");
const customStatuses = require("../../../configurations/custom-statuses");
const apiResponseHelper = require("../../../dependency-injections/utilities/api-response");

class Controller {
  constructor(...useCases) {
    useCases.forEach((useCase, index) => {
      this[Controller.methods[index]] = this.handleRequest(useCase);
    });
  }

  static methods = [
    "getListByMonths",
    "getDepartment",
    "addNewDepartment",
    "updateDepartment",
    "deleteDepartment",
  ];

  handleRequest(useCase) {
    return async (req, res) => {
      try {
        const result = await useCase(req, res);
        return result;
      } catch (error) {
        console.error(error);
        // Handle error response here
        return apiResponseHelper(
          res,
          customStatuses.internalServerError,
          customMessages.internalServerError,
          error.msg
        );
      }
    };
  }
}

module.exports = Controller;
