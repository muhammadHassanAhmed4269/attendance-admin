const Pages = require("../../pages/designations/pages");
const Controller = require("../../interfaces/controllers/pages/designations");
const setUpRoutes = require("../../interfaces/routes/pages/designations");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
