const Pages = require("../../pages/units/pages");
const Controller = require("../../interfaces/controllers/pages/units");
const setUpRoutes = require("../../interfaces/routes/pages/units");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
