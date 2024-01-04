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
// } = require("../../../validation/Employees/validation");
const {
  uploadProfilePicture,
  uploadNicFrontPicture,
  uploadNicBackPicture,
} = require("../../middlewares/multer");

const router = require("express").Router();

const setUpRoutes = (controller) => {
  try {
    // router.get(
    //   customBackendRoutes.employees.getList,
    //   // getList,
    //   // validate,
    //   controller.getEmployees.bind(controller)
    // );

    // router.get(
    //   customBackendRoutes.employees.get,
    //   // get,
    //   // validate,
    //   controller.getEmployee.bind(controller)
    // );

    router.post(
      customBackendRoutes.employees.addNew,
      (req, res, next) => {
        uploadProfilePicture(req, res, function (err) {
          if (err) {
            // Multer error handling
            console.error(err);
            return res.status(500).send("File upload error");
          }
          req.profilePicture = req.file;
          next();
        });
      },
      (req, res, next) => {
        uploadNicFrontPicture(req, res, function (err) {
          if (err) {
            // Multer error handling
            console.error(err);
            return res.status(500).send("File upload error");
          }
          req.frontPicture = req.file;
          next();
        });
      },
      (req, res, next) => {
        uploadNicBackPicture(req, res, function (err) {
          if (err) {
            // Multer error handling
            console.error(err);
            return res.status(500).send("File upload error");
          }
          req.frontPicture = req.file;
          next();
        });
      },
      controller.addNewEmployee.bind(controller)
    );

    router.put(
      customBackendRoutes.employees.update,
      // update,
      // validate,
      controller.updateEmployee.bind(controller)
    );

    router.delete(
      customBackendRoutes.employees.delete,
      // remove,
      // validate,
      controller.deleteEmployee.bind(controller)
    );

    return router;
  } catch (error) {
    console.error(error);
  }
};

module.exports = setUpRoutes;
