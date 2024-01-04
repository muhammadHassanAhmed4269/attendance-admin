const Shift = require("../../models/shifts/schema");

class Pages {
  async getShifts(req, res) {
    try {
      const shifts = await getShifts();
      return res.render("shifts/get-list", {
        title: "Shifts",
        shifts,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewShift(req, res) {
    try {
      return res.render("shifts/add-new", {
        title: "Add New Shift",
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateShift(req, res) {
    try {
      const shift = await getShift(req.query._id);
      return res.render("shifts/update", {
        title: "Update Shift",
        shift,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getShift(_id) {
  try {
    const shift = await Shift.findById(_id);
    return shift;
  } catch (error) {
    console.error(error);
  }
}

async function getShifts() {
  try {
    const getShifts = await Shift.find();
    const shifts = [];
    let count = 0;
    getShifts.map((p) => {
      count += 1;
      shifts.push({
        count: count,
        _id: p._id,
        name: p.name,
        timings: p.timings,
      });
    });
    return shifts;
  } catch (error) {
    console.error(error);
  }
}
