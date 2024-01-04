const Model = require("../../models/shifts/schema");
const Repository = require("../../repositories/mongo");
const GetListUseCase = require("../../use-cases/shifts/get-list");
const GetUseCase = require("../../use-cases/shifts/get");
const AddNewUseCase = require("../../use-cases/shifts/add-new");
const UpdateUseCase = require("../../use-cases/shifts/update");
const DeleteUseCase = require("../../use-cases/shifts/delete");
const Controller = require("../../interfaces/controllers/shifts/controllers");
const setUpRoutes = require("../../interfaces/routes/shifts/routes");

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
