const Model = require("../../models/holidays/schema");
const Repository = require("../../repositories/mongo");
const AddNewUseCase = require("../../use-cases/holidays/add-new");
const UpdateUseCase = require("../../use-cases/holidays/update");
const DeleteUseCase = require("../../use-cases/holidays/delete");
const Controller = require("../../interfaces/controllers/holidays/controllers");
const setUpRoutes = require("../../interfaces/routes/holidays/routes");

const repository = new Repository(Model);
const addNewUseCase = new AddNewUseCase(repository);
const updateUseCase = new UpdateUseCase(repository);
const deleteUseCase = new DeleteUseCase(repository);
const controller = new Controller(addNewUseCase, updateUseCase, deleteUseCase);
const routes = setUpRoutes(controller);

module.exports = routes;
