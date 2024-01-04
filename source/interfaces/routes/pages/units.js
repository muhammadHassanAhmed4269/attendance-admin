const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.units.getList,
      controller.getUnits.bind(controller)
    );

    router.get(
      customFrontendRoutes.units.get,
      controller.getUnit.bind(controller)
    );

    router.get(
      customFrontendRoutes.units.addNew,
      controller.addNewUnit.bind(controller)
    );

    router.get(
      customFrontendRoutes.units.update,
      controller.updateUnit.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
