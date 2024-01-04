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
} = require("../../../validation/departments/validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customBackendRoutes.departments.getList,
      getList,
      validate,
      controller.getDepartments.bind(controller)
    );

    router.get(
      customBackendRoutes.departments.get,
      get,
      validate,
      controller.getDepartment.bind(controller)
    );

    router.post(
      customBackendRoutes.departments.addNew,
      addNew,
      validate,
      controller.addNewDepartment.bind(controller)
    );

    router.put(
      customBackendRoutes.departments.update,
      update,
      validate,
      controller.updateDepartment.bind(controller)
    );

    router.delete(
      customBackendRoutes.departments.delete,
      remove,
      validate,
      controller.deleteDepartment.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
