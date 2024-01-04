const Department = require("../../models/departments/schema");
const Designation = require("../../models/designations/schema");

class Pages {
  async getDepartments(req, res) {
    try {
      const departments = await getDepartments();
      return res.render("departments/get-list", {
        title: "Departments",
        departments,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getDepartment(req, res) {
    try {
      const department = await getDepartment(req.query._id);
      let count = 0;
      const designations = department.designations.map((d) => {
        count++;
        return {
          count: count,
          _id: d._id,
          name: d.name,
        };
      });
      return res.render("departments/get", {
        title: "Department",
        department,
        designations,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewDepartment(req, res) {
    try {
      const designations = await getDesignations();
      return res.render("departments/add-new", {
        title: "Add New Department",
        designations,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateDepartment(req, res) {
    try {
      let count = 0;
      const department = await getDepartment(req.query._id);
      const filteredDesignations = await compareDesignations(req.query._id);

      filteredDesignations.map((r) => {
        count++;
        return {
          count: count,
          _id: r._id,
          name: r.name,
          selected: r.selected,
        };
      });

      return res.render("departments/update", {
        title: "Update Department",
        department,
        designations: filteredDesignations,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getDepartment(_id) {
  try {
    const department = await Department.findById(_id).populate("designations");
    return department;
  } catch (error) {
    console.error(error);
  }
}

async function getDepartments() {
  try {
    const getDepartments = await Department.find();
    const departments = [];
    let count = 0;
    getDepartments.map((p) => {
      count += 1;
      departments.push({
        count: count,
        _id: p._id,
        name: p.name,
      });
    });
    return departments;
  } catch (error) {
    console.error(error);
  }
}

async function compareDesignations(_id) {
  try {
    const designations = await getDesignations();
    const department = await getDepartment(_id);

    designations.forEach((d1) => {
      const match = department.designations.find(
        (d2) => d2._id.toString() === d1._id.toString()
      );

      if (match) {
        d1.selected = true;
      } else {
        d1.selected = false;
      }
    });

    return designations;
  } catch (error) {
    console.error(error);
  }
}

async function getDesignations() {
  try {
    const getDesignations = await Designation.find();
    const designation = [];
    let count = 0;
    getDesignations.map((p) => {
      count += 1;
      designation.push({
        count: count,
        _id: p._id,
        name: p.name,
      });
    });
    return designation;
  } catch (error) {
    console.error(error);
  }
}
