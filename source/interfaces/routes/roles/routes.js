const {
  customBackendRoutes,
} = require("../../../configurations/custom-routes");
const {
  getList,
  validate,
  get,
  addNew,
  update,
  remove,
} = require("../../../validation/roles/validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customBackendRoutes.roles.getList,
      getList,
      validate,
      controller.getRoles.bind(controller)
    );

    router.get(
      customBackendRoutes.roles.get,
      get,
      validate,
      controller.getRole.bind(controller)
    );

    router.post(
      customBackendRoutes.roles.addNew,
      addNew,
      validate,
      controller.addNewRole.bind(controller)
    );

    router.put(
      customBackendRoutes.roles.update,
      update,
      validate,
      controller.updateRole.bind(controller)
    );

    router.delete(
      customBackendRoutes.roles.delete,
      remove,
      validate,
      controller.deleteRole.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
