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
} = require("../../../validation/units/validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customBackendRoutes.units.getList,
      getList,
      validate,
      controller.getUnits.bind(controller)
    );

    router.get(
      customBackendRoutes.units.get,
      get,
      validate,
      controller.getUnit.bind(controller)
    );

    router.post(
      customBackendRoutes.units.addNew,
      addNew,
      validate,
      controller.addNewUnit.bind(controller)
    );

    router.put(
      customBackendRoutes.units.update,
      update,
      validate,
      controller.updateUnit.bind(controller)
    );

    router.delete(
      customBackendRoutes.units.delete,
      remove,
      validate,
      controller.deleteUnit.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
