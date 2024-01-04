const Pages = require("../../pages/dashboard/pages");
const Controller = require("../../interfaces/controllers/pages/dashboard");
const setUpRoutes = require("../../interfaces/routes/pages/dashboard");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
