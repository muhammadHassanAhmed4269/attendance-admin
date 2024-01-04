const Permission = require("../../models/permissions/schema");
const Role = require("../../models/roles/schema");

class Pages {
  async getRoles(req, res) {
    try {
      const roles = await getRoles();
      return res.render("roles/get-list", {
        title: "Roles",
        roles,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getRole(req, res) {
    try {
      const role = await getRole(req.query._id);
      const permissions = await getPermissions(role);
      return res.render("roles/get", {
        title: "Role",
        role,
        permissions,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewRole(req, res) {
    try {
      const permissions = await getAllPermissions();
      return res.render("roles/add-new", {
        title: "Add New Role",
        permissions,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateRole(req, res) {
    try {
      const role = await getRole(req.query._id);
      const rolePermissions = await getPermissions(role);
      const allPermissions = await getAllPermissions();
      const filteredPermissions = await comparePermissions(
        allPermissions,
        rolePermissions
      );
      return res.render("roles/update", {
        title: "Update Role",
        role,
        permissions: filteredPermissions,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getRole(_id) {
  try {
    const role = await Role.findById(_id).populate("permissions");
    return role;
  } catch (error) {
    console.error(error);
  }
}

async function getRoles() {
  try {
    const getRoles = await Role.find();
    const roles = [];
    let count = 0;
    getRoles.map((p) => {
      count += 1;
      roles.push({
        count: count,
        _id: p._id,
        name: p.name,
      });
    });
    return roles;
  } catch (error) {
    console.error(error);
  }
}

async function getPermissions(roleData) {
  try {
    const permissions = {
      dashboard: { view: {}, edit: {} },
      employee: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      unit: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      department: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      designation: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      shift: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      role: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      attendance: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
    };

    roleData.permissions.forEach((permissionObj) => {
      const [action, entity] = permissionObj.name.split(" ");

      if (permissions[entity] && permissions[entity][action]) {
        permissions[entity][action] = {
          _id: permissionObj._id,
          name: permissionObj.name.split(" ")[0],
        };
      }
    });

    const permissionsWithFilledRows = Object.keys(permissions).map((entity) => {
      const actions = Object.values(permissions[entity]);
      while (actions.length < 5) {
        actions.push({});
      }
      return { entity, permissions: actions };
    });

    return permissionsWithFilledRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function getAllPermissions() {
  try {
    const getPermissions = await Permission.find();

    const permissions = {
      dashboard: { view: {}, edit: {} },
      employee: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      unit: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      department: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      designation: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      shift: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      role: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
      attendance: { list: {}, view: {}, add: {}, edit: {}, delete: {} },
    };

    getPermissions.forEach((permissionObj) => {
      const [action, entity] = permissionObj.name.split(" ");

      if (permissions[entity] && permissions[entity][action]) {
        permissions[entity][action] = {
          _id: permissionObj._id,
          name: permissionObj.name.split(" ")[0],
        };
      }
    });

    const permissionsWithFilledRows = Object.keys(permissions).map((entity) => {
      const actions = Object.values(permissions[entity]);
      while (actions.length < 5) {
        actions.push({});
      }
      return { entity, permissions: actions };
    });

    return permissionsWithFilledRows;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

async function comparePermissions(allPermissions, rolePermissions) {
  const comparedPermissions = allPermissions.map((allPermission) => {
    const rolePermission = rolePermissions.find(
      (rp) => rp.entity === allPermission.entity
    );

    if (rolePermission) {
      const permissions = allPermission.permissions.map((permission) => {
        const matchingPermission = rolePermission.permissions.find(
          (rp) => rp.name === permission.name
        );

        if (matchingPermission) {
          return {
            ...permission,
            selected: true,
          };
        } else {
          return {
            ...permission,
            selected: false,
          };
        }
      });

      return {
        ...allPermission,
        permissions,
      };
    } else {
      // If rolePermission is not found for the entity, set permissions as unselected
      return {
        ...allPermission,
        permissions: allPermission.permissions.map((permission) => ({
          ...permission,
          selected: false,
        })),
      };
    }
  });

  return comparedPermissions;
}

function removeUndefinedElements(arr) {
  return arr.filter((item) => item !== undefined);
}
