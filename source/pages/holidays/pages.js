const Holiday = require("../../models/holidays/schema");

class Pages {
  async getHolidays(req, res) {
    try {
      const holidays = await getHolidays();
      return res.render("holidays/get-list", {
        title: "Holidays",
        holidays,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async addNewHoliday(req, res) {
    try {
      return res.render("holidays/add-new", {
        title: "Add New Holiday",
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async updateHoliday(req, res) {
    try {
      const holiday = await getHoliday(req.query._id);
      return res.render("holidays/update", {
        title: "Update Holiday",
        holiday,
        user: req?.user,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getHoliday(_id) {
  try {
    const holiday = await Holiday.findById(_id);
    return holiday;
  } catch (error) {
    console.error(error);
  }
}

async function getHolidays() {
  try {
    const getHolidays = await Holiday.find();
    const holidays = [];
    let count = 0;
    getHolidays.map((p) => {
      count += 1;
      holidays.push({
        count: count,
        _id: p._id,
        name: p.name,
        startDate: p.startDate,
        endDate: p.endDate,
        description: p.description,
      });
    });
    return holidays;
  } catch (error) {
    console.error(error);
  }
}
