const {
  customFrontendRoutes,
} = require("../../../configurations/custom-routes");
const isLoggedIn = require("../../middlewares/isLoggedIn");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customFrontendRoutes.auth.login,
      isLoggedIn,
      controller.getLogin.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
