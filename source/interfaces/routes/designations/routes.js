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
} = require("../../../validation/designation/validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customBackendRoutes.designations.getList,
      getList,
      validate,
      controller.getDesignations.bind(controller)
    );

    router.get(
      customBackendRoutes.designations.get,
      get,
      validate,
      controller.getDesignation.bind(controller)
    );

    router.post(
      customBackendRoutes.designations.addNew,
      addNew,
      validate,
      controller.addNewDesignation.bind(controller)
    );

    router.put(
      customBackendRoutes.designations.update,
      update,
      validate,
      controller.updateDesignation.bind(controller)
    );

    router.delete(
      customBackendRoutes.designations.delete,
      remove,
      validate,
      controller.deleteDesignation.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
