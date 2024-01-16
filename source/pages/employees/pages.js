const Employee = require("../../models/employees/schema");
const Unit = require("../../models/units/schema");
const Shift = require("../../models/shifts/schema");

class Pages {
  async getEmployees(req, res) {
    try {
      const employees = await getEmployees();
      console.log(employees);
      return res.render("employees/get-list", {
        title: "Employees",
        employees,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewEmployee(req, res) {
    try {
      const units = await getUnits();
      const shifts = await getShifts();
      return res.render("employees/add-new", {
        title: "Add New Employee",
        units,
        shifts,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateEmployee(req, res) {
    try {
      const employee = await getEmployee(req.query._id);
      const units = await getUnits();
      const shifts = await getShifts();
      return res.render("employees/update", {
        title: "Update Employee",
        employee,
        units,
        shifts,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getEmployee(_id) {
  try {
    const employee = await Employee.findById(_id).populate(
      "unit department designation"
    );
    return employee;
  } catch (error) {
    console.error(error);
  }
}

async function getEmployees() {
  try {
    const getemployees = await Employee.find().populate(
      "unit department designation"
    );
    const employees = [];
    let count = 0;
    getemployees.map((p) => {
      count += 1;
      employees.push({
        count: count,
        _id: p._id,
        fullName: p.fullName,
        email: p.email,
        mobileNumber: p.mobileNumber,
        nicNumber: p.nicNumber,
        units: p.unit || "--",
        departments: p.department || "--",
        designations: p.designation || "--",
      });
    });
    return employees;
  } catch (error) {
    console.error(error);
  }
}

async function getUnits() {
  try {
    const units = await Unit.find();
    return units;
  } catch (error) {
    console.error(error);
  }
}

async function getShifts() {
  try {
    const shifts = await Shift.find();
    return shifts;
  } catch (error) {
    console.error(error);
  }
}
