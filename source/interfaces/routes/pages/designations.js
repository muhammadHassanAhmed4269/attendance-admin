const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.designations.getList,
      controller.getDesignations.bind(controller)
    );

    router.get(
      customFrontendRoutes.designations.get,
      controller.getDesignation.bind(controller)
    );

    router.get(
      customFrontendRoutes.designations.addNew,
      controller.addNewDesignation.bind(controller)
    );

    router.get(
      customFrontendRoutes.designations.update,
      controller.updateDesignation.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
