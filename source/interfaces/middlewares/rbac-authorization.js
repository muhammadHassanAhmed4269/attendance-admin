const customMessages = require("../../configurations/custom-messages");
const customStatuses = require("../../configurations/custom-statuses");
const apiResponseHelper = require("../../dependency-injections/utilities/api-response");
const Permission = require("../../models/permissions/schema");
const { isNotFound } = require("entity-checker");

const roleBasedAuthorization = async (req, res, next) => {
  try {
    const user = req.user;
    const path = req.path;

    const permissions = await Permission.find({
      _id: { $in: user.role[0].permissions.map((p) => p._id) },
    });

    const routes = permissions.map((perm) => {
      const entity = perm.name.split(" ")[1];
      const route = identifyTheRoutes(path, entity);

      if (route === "client") {
        const currentAction = determineClientAllowedRoute(path, entity);
        return {
          type: "client",
          status: perm.name === `${currentAction} ${entity}`,
        };
      } else {
        // Handle server routes
        const currentAction = determineServerAllowedRoute(path, entity);
        return {
          type: "server",
          status: perm.name === `${currentAction} ${entity}`,
        };
      }
    });

    if (isNotFound(routes)) {
      return res.render("error/403"); // Handle other cases
    }

    const clientHasAccess = routes.some(
      (route) => route.status === true && route.type === "client"
    );

    const serverHasAccess = routes.some(
      (route) => route.status === true && route.type === "server"
    );

    if (clientHasAccess === true) {
      req.permissions = permissions;
      return next();
    } else if (serverHasAccess === true) {
      req.permissions = permissions;
      return next();
    } else if (clientHasAccess === false) {
      return res.render("error/403");
    } else if (serverHasAccess === false) {
      return apiResponseHelper(
        res,
        customStatuses.forbidden,
        customMessages.forbidden
      );
    } else {
      return res.render("error/500");
    }
  } catch (error) {
    console.error(error);
    return apiResponseHelper(
      res,
      customStatuses.internalServerError,
      customMessages.internalServerError
    );
  }
};

function identifyTheRoutes(path, entity) {
  try {
    if (path.startsWith(`/api/v1/auth/${entity}`)) {
      return "server";
    } else {
      return "client";
    }
  } catch (error) {
    console.error(error);
  }
}

function determineServerAllowedRoute(path, entity) {
  if (path.startsWith("/api/v1/auth") && path.endsWith(`/${entity}s`)) {
    return "list";
  } else if (path.startsWith("/api/v1/auth") && path.endsWith(`/${entity}`)) {
    return "view";
  } else if (
    path.startsWith("/api/v1/auth") &&
    path.endsWith(`/${entity}/add-new`)
  ) {
    return "add";
  } else if (
    path.startsWith("/api/v1/auth") &&
    path.endsWith(`/${entity}/update`)
  ) {
    return "edit";
  } else if (
    path.startsWith("/api/v1/auth") &&
    path.endsWith(`/${entity}/delete`)
  ) {
    return "delete";
  } else {
    return "unknown";
  }
}

function determineClientAllowedRoute(path, entity) {
  if (path.endsWith(`/${entity}s`)) {
    return "list";
  } else if (path.endsWith(`/${entity}`)) {
    return "view";
  } else if (path.endsWith(`/${entity}/add-new`)) {
    return "add";
  } else if (path.endsWith(`/${entity}/update`)) {
    return "edit";
  } else if (path.endsWith(`/${entity}/delete`)) {
    return "delete";
  } else {
    return "unknown";
  }
}

module.exports = roleBasedAuthorization;
