const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.shifts.getList,
      controller.getShifts.bind(controller)
    );

    router.get(
      customFrontendRoutes.shifts.addNew,
      controller.addNewShift.bind(controller)
    );

    router.get(
      customFrontendRoutes.shifts.update,
      controller.updateShift.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
