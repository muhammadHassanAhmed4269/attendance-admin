const Pages = require("../../pages/employees/pages");
const Controller = require("../../interfaces/controllers/pages/employees");
const setUpRoutes = require("../../interfaces/routes/pages/employees");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
