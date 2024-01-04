const {
  customBackendRoutes,
} = require("../../../configurations/custom-routes");
// const {
//   getList,
//   validate,
//   get,
//   addNew,
//   update,
//   remove,
// } = require("../../../validation/departments/validation");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    router.get(
      customBackendRoutes.attendances.getList,
      controller.getListByMonths.bind(controller)
    );

    // router.get(
    //   customBackendRoutes.attendances.get,
    //   get,
    //   validate,
    //   controller.getDepartment.bind(controller)
    // );

    // router.post(
    //   customBackendRoutes.attendances.addNew,
    //   addNew,
    //   validate,
    //   controller.addNewDepartment.bind(controller)
    // );

    // router.put(
    //   customBackendRoutes.attendances.update,
    //   update,
    //   validate,
    //   controller.updateDepartment.bind(controller)
    // );

    // router.delete(
    //   customBackendRoutes.attendances.delete,
    //   remove,
    //   validate,
    //   controller.deleteDepartment.bind(controller)
    // );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
