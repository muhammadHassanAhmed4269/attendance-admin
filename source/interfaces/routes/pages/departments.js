const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.departments.getList,
      controller.getDepartments.bind(controller)
    );

    router.get(
      customFrontendRoutes.departments.get,
      controller.getDepartment.bind(controller)
    );

    router.get(
      customFrontendRoutes.departments.addNew,
      controller.addNewDepartment.bind(controller)
    );

    router.get(
      customFrontendRoutes.departments.update,
      controller.updateDepartment.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
