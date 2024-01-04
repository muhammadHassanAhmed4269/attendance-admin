const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.permissions.getList,
      controller.getPermissions.bind(controller)
    );

    router.get(
      customFrontendRoutes.permissions.addNew,
      controller.addNewPermission.bind(controller)
    );

    router.get(
      customFrontendRoutes.permissions.update,
      controller.updatePermission.bind(controller)
    );
    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
