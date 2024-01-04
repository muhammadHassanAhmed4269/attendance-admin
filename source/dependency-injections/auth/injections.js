const Model = require("../../models/employees/schema");
const Repository = require("../../repositories/mongo");
const AuthUseCase = require("../../use-cases/auth/login");
const Controller = require("../../interfaces/controllers/auth/controllers");
const setUpRoutes = require("../../interfaces/routes/auth/routes");

const repository = new Repository(Model);
const authUseCase = new AuthUseCase(repository);
const controller = new Controller(authUseCase);
const routes = setUpRoutes(controller);

module.exports = routes;
