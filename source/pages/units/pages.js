const Unit = require("../../models/units/schema");
const Department = require("../../models/departments/schema");

class Pages {
  async getUnits(req, res) {
    try {
      const units = await getUnits();
      return res.render("units/get-list", {
        title: "Units",
        units,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getUnit(req, res) {
    try {
      const unit = await getUnit(req.query._id);

      console.log(unit);
      let count = 0;
      const departments = unit.departments.map((d) => {
        count++;
        return {
          count: count,
          _id: d._id,
          name: d.name,
        };
      });
      return res.render("units/get", {
        title: "Unit",
        unit,
        departments,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewUnit(req, res) {
    try {
      const departments = await getDepartments();
      return res.render("units/add-new", {
        title: "Add New Unit",
        departments,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateUnit(req, res) {
    try {
      let count = 0;
      const unit = await getUnit(req.query._id);
      const filteredDepartments = await compareDepartments(req.query._id);

      filteredDepartments.map((r) => {
        count++;
        return {
          count: count,
          _id: r._id,
          name: r.name,
          selected: r.selected,
        };
      });

      return res.render("units/update", {
        title: "Update Unit",
        unit,
        departments: filteredDepartments,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getUnit(_id) {
  try {
    const unit = await Unit.findById(_id).populate("departments");
    return unit;
  } catch (error) {
    console.error(error);
  }
}

async function getUnits() {
  try {
    const getUnits = await Unit.find();
    const units = [];
    let count = 0;
    getUnits.map((p) => {
      count += 1;
      units.push({
        count: count,
        _id: p._id,
        name: p.name,
      });
    });
    return units;
  } catch (error) {
    console.error(error);
  }
}

async function compareDepartments(_id) {
  try {
    const departments = await getDepartments();
    const unit = await getUnit(_id);

    departments.forEach((d1) => {
      const match = unit.departments.find(
        (d2) => d2._id.toString() === d1._id.toString()
      );

      if (match) {
        d1.selected = true;
      } else {
        d1.selected = false;
      }
    });

    return departments;
  } catch (error) {
    console.error(error);
  }
}

async function getDepartments() {
  try {
    const getDepartments = await Department.find();
    const department = [];
    let count = 0;
    getDepartments.map((p) => {
      count += 1;
      department.push({
        count: count,
        _id: p._id,
        name: p.name,
      });
    });
    return department;
  } catch (error) {
    console.error(error);
  }
}
