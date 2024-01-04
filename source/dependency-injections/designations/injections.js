const Model = require("../../models/designations/schema");
const Repository = require("../../repositories/mongo");
const GetListUseCase = require("../../use-cases/designations/get-list");
const GetUseCase = require("../../use-cases/designations/get");
const AddNewUseCase = require("../../use-cases/designations/add-new");
const UpdateUseCase = require("../../use-cases/designations/update");
const DeleteUseCase = require("../../use-cases/designations/delete");
const Controller = require("../../interfaces/controllers/designations/controllers");
const setUpRoutes = require("../../interfaces/routes/designations/routes");

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
