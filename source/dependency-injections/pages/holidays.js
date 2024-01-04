const Pages = require("../../pages/holidays/pages");
const Controller = require("../../interfaces/controllers/pages/holidays");
const setUpRoutes = require("../../interfaces/routes/pages/holidays");

const pages = new Pages();
const controller = new Controller(pages);
const routes = setUpRoutes(controller);

module.exports = routes;
