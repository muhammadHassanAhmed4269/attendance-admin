const Pages = require("../../pages/departments/pages");
const Controller = require("../../interfaces/controllers/pages/departments");
const setUpRoutes = require("../../interfaces/routes/pages/departments");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
