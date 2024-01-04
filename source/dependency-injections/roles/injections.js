const Model = require("../../models/roles/schema");
const Repository = require("../../repositories/mongo");
const GetListUseCase = require("../../use-cases/roles/get-list");
const GetUseCase = require("../../use-cases/roles/get");
const AddNewUseCase = require("../../use-cases/roles/add-new");
const UpdateUseCase = require("../../use-cases/roles/update");
const DeleteUseCase = require("../../use-cases/roles/delete");
const Controller = require("../../interfaces/controllers/roles/controllers");
const setUpRoutes = require("../../interfaces/routes/roles/routes");

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
