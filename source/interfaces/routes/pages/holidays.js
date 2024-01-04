const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.holidays.getList,
      controller.getHolidays.bind(controller)
    );

    router.get(
      customFrontendRoutes.holidays.addNew,
      controller.addNewHoliday.bind(controller)
    );

    router.get(
      customFrontendRoutes.holidays.update,
      controller.updateHoliday.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
