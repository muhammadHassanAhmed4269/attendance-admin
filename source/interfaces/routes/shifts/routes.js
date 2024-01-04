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
} = require("../../../validation/shifts/validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customBackendRoutes.shifts.getList,
      getList,
      validate,
      controller.getShifts.bind(controller)
    );

    router.get(
      customBackendRoutes.shifts.get,
      get,
      validate,
      controller.getShift.bind(controller)
    );

    router.post(
      customBackendRoutes.shifts.addNew,
      addNew,
      validate,
      controller.addNewShift.bind(controller)
    );

    router.put(
      customBackendRoutes.shifts.update,
      update,
      validate,
      controller.updateShift.bind(controller)
    );

    router.delete(
      customBackendRoutes.shifts.delete,
      remove,
      validate,
      controller.deleteShift.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
