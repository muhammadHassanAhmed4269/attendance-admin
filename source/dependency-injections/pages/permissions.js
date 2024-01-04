const Pages = require("../../pages/permissions/pages");
const Controller = require("../../interfaces/controllers/pages/permissions");
const setUpRoutes = require("../../interfaces/routes/pages/permissions");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
