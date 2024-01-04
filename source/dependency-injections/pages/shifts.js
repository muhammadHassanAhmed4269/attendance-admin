const Pages = require("../../pages/shifts/pages");
const Controller = require("../../interfaces/controllers/pages/shifts");
const setUpRoutes = require("../../interfaces/routes/pages/shifts");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
