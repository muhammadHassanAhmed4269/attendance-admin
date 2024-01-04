const Model = require("../../models/permissions/schema");
const Repository = require("../../repositories/mongo");
const GetListUseCase = require("../../use-cases/permissions/get-list");
const GetUseCase = require("../../use-cases/permissions/get");
const AddNewUseCase = require("../../use-cases/permissions/add-new");
const UpdateUseCase = require("../../use-cases/permissions/update");
const DeleteUseCase = require("../../use-cases/permissions/delete");
const Controller = require("../../interfaces/controllers/permissions/controllers");
const setUpRoutes = require("../../interfaces/routes/permissions/routes");

const repository = new Repository(Model);
const getListUseCase = new GetListUseCase(repository);
const getUseCase = new GetUseCase(repository);
const addNewUseCase = new AddNewUseCase(repository);
const updateUseCase = new UpdateUseCase(repository);
const deleteUseCase = new DeleteUseCase(repository);
const controller = new Controller(
  getListUseCase,
  getUseCase,
  addNewUseCase,
  updateUseCase,
  deleteUseCase
);
const routes = setUpRoutes(controller);

module.exports = routes;
