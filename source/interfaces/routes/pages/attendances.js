const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.attendances.getList,
      controller.getAttendances.bind(controller)
    );

    router.get(
      customFrontendRoutes.attendances.get,
      controller.getAttendance.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
