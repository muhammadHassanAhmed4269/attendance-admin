const Designation = require("../../models/designations/schema");
const Role = require("../../models/roles/schema");

class Pages {
  async getDesignations(req, res) {
    try {
      const designations = await getDesignations();
      return res.render("designations/get-list", {
        title: "Designations",
        designations,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getDesignation(req, res) {
    try {
      const designation = await getDesignation(req.query._id);
      let count = 0;
      const roles = designation.roles.map((r) => {
        count++;
        return {
          count: count,
          _id: r._id,
          name: r.name,
        };
      });
      return res.render("designations/get", {
        title: "Designation",
        designation,
        roles,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewDesignation(req, res) {
    try {
      const roles = await getRoles();
      return res.render("designations/add-new", {
        title: "Add New Designation",
        roles,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateDesignation(req, res) {
    try {
      let count = 0;
      const designation = await getDesignation(req.query._id);
      const filteredRoles = await compareDesignations(req.query._id);

      filteredRoles.map((r) => {
        count++;
        return {
          count: count,
          _id: r._id,
          name: r.name,
          selected: r.selected,
        };
      });

      return res.render("designations/update", {
        title: "Update Designation",
        designation,
        roles: filteredRoles,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getDesignation(_id) {
  try {
    const designation = await Designation.findById(_id).populate("roles");
    return designation;
  } catch (error) {
    console.error(error);
  }
}

async function getDesignations() {
  try {
    const getDesignations = await Designation.find();
    const designations = [];
    let count = 0;
    getDesignations.map((p) => {
      count += 1;
      designations.push({
        count: count,
        _id: p._id,
        name: p.name,
      });
    });
    return designations;
  } catch (error) {
    console.error(error);
  }
}

async function compareDesignations(_id) {
  try {
    const roles = await getRoles();
    const role = await getDesignation(_id);

    roles.forEach((r1) => {
      const match = role.roles.find(
        (r2) => r2._id.toString() === r1._id.toString()
      );

      if (match) {
        r1.selected = true; // Set 'selected' as true if _id matches
      } else {
        r1.selected = false; // Set 'selected' as false if _id doesn't match
      }
    });

    return roles;
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
