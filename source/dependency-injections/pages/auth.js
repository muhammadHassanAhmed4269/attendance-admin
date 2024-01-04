const Pages = require("../../pages/auth/pages");
const Controller = require("../../interfaces/controllers/pages/auth");
const setUpRoutes = require("../../interfaces/routes/pages/auth");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
