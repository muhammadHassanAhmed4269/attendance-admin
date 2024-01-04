const {
  customBackendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.post(
      customBackendRoutes.holidays.addNew,
      controller.addNewHoliday.bind(controller)
    );

    router.put(
      customBackendRoutes.holidays.update,
      controller.updateHoliday.bind(controller)
    );

    router.delete(
      customBackendRoutes.holidays.delete,
      controller.deleteHoliday.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
