const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.employees.getList,
      controller.getEmployees.bind(controller)
    );

    router.get(
      customFrontendRoutes.employees.addNew,
      controller.addNewEmployee.bind(controller)
    );

    router.get(
      customFrontendRoutes.employees.update,
      controller.updateEmployee.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
