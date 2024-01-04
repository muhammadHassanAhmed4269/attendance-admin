const Pages = require("../../pages/roles/pages");
const Controller = require("../../interfaces/controllers/pages/roles");
const setUpRoutes = require("../../interfaces/routes/pages/roles");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
