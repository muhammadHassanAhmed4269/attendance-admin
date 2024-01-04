const Model = require("../../models/attendances/schema");
const Repository = require("../../repositories/mongo");
const GetListByMonthsUseCase = require("../../use-cases/attendances/get-list-by-months");
const Controller = require("../../interfaces/controllers/attendances/controllers");
const setUpRoutes = require("../../interfaces/routes/attendances/routes");

const repository = new Repository(Model);
const getListByMonthsUseCase = new GetListByMonthsUseCase(repository);
const controller = new Controller(getListByMonthsUseCase);
const routes = setUpRoutes(controller);

module.exports = routes;
