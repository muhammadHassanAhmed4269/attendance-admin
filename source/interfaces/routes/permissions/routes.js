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
} = require("../../../validation/permissions/validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customBackendRoutes.permissions.getList,
      getList,
      validate,
      controller.getPermissions.bind(controller)
    );

    router.get(
      customBackendRoutes.permissions.get,
      get,
      validate,
      controller.getPermission.bind(controller)
    );

    router.post(
      customBackendRoutes.permissions.addNew,
      addNew,
      validate,
      controller.addNewPermission.bind(controller)
    );

    router.put(
      customBackendRoutes.permissions.update,
      update,
      validate,
      controller.updatePermission.bind(controller)
    );

    router.delete(
      customBackendRoutes.permissions.delete,
      remove,
      validate,
      controller.deletePermission.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
