const {
  customBackendRoutes,
} = require("../../../configurations/custom-routes");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.post(
      customBackendRoutes.auth.login,
      controller.getLogin.bind(controller)
    );

    router.get(
      customBackendRoutes.auth.logout,
      controller.getLogout.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
