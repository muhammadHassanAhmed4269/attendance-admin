const Pages = require("../../pages/attendances/pages");
const Controller = require("../../interfaces/controllers/pages/attendances");
const setUpRoutes = require("../../interfaces/routes/pages/attendances");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
