const Permission = require("../../models/permissions/schema");

class Pages {
  async getPermissions(req, res) {
    try {
      const permissions = await getPermissions();
      return res.render("permissions/get-list", {
        title: "Permissions",
        permissions,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewPermission(req, res) {
    try {
      return res.render("permissions/add-new", {
        title: "Add New Permission",
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updatePermission(req, res) {
    try {
      const permission = await getPermission(req.query._id);
      return res.render("permissions/update", {
        title: "Update Permission",
        permission,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getPermission(_id) {
  try {
    const permission = await Permission.findById(_id);
    return permission;
  } catch (error) {
    console.error(error);
  }
}

async function getPermissions() {
  try {
    const getPermissions = await Permission.find();
    const permissions = [];
    let count = 0;
    getPermissions.map((p) => {
      count += 1;
      permissions.push({
        count: count,
        _id: p._id,
        name: p.name,
      });
    });
    return permissions;
  } catch (error) {
    console.error(error);
  }
}
