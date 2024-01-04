const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.roles.getList,
      controller.getRoles.bind(controller)
    );

    router.get(
      customFrontendRoutes.roles.get,
      controller.getRole.bind(controller)
    );

    router.get(
      customFrontendRoutes.roles.addNew,
      controller.addNewRole.bind(controller)
    );

    router.get(
      customFrontendRoutes.roles.update,
      controller.updateRole.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
