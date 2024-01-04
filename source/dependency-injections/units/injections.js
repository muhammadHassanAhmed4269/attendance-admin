const Model = require("../../models/units/schema");
const Repository = require("../../repositories/mongo");
const GetListUseCase = require("../../use-cases/units/get-list");
const GetUseCase = require("../../use-cases/units/get");
const AddNewUseCase = require("../../use-cases/units/add-new");
const UpdateUseCase = require("../../use-cases/units/update");
const DeleteUseCase = require("../../use-cases/units/delete");
const Controller = require("../../interfaces/controllers/units/controllers");
const setUpRoutes = require("../../interfaces/routes/units/routes");

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
