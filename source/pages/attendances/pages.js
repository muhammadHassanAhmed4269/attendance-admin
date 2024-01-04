const Attendance = require("../../models/attendances/schema");
const Department = require("../../models/departments/schema");
const Designation = require("../../models/designations/schema");
const Holiday = require("../../models/holidays/schema");
const Shift = require("../../models/shifts/schema");
const Unit = require("../../models/units/schema");

class Pages {
  async getAttendances(req, res) {
    try {
      const attendances = await getAttendancesByMonth();
      return res.render("attendances/get-list", {
        title: "Attendances",
        attendances,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async getAttendance(req, res) {
    try {
      const attendance = await getAttendancesOfAMonth(
        req.query._id,
        req.query.month
      );
      // console.log(attendance);
      return res.render("attendances/get", {
        title: "Attendances",
        employee: attendance.employeeDetails,
        attendance: attendance.newAttendance,
      });
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Pages;

async function getDepartment(_id) {
  try {
    const department = await Department.findById(_id);
    return department;
  } catch (error) {
    console.error(error);
  }
}

async function getDesignation(_id) {
  try {
    const designation = await Designation.findById(_id);
    return designation;
  } catch (error) {
    console.error(error);
  }
}

async function getUnit(_id) {
  try {
    const unit = await Unit.findById(_id);
    return unit;
  } catch (error) {
    console.error(error);
  }
}

async function getShift(_id) {
  try {
    const shift = await Shift.findById(_id);
    return shift;
  } catch (error) {
    console.error(error);
  }
}

async function getAttendancesByMonth() {
  try {
    const monthWiseAttendances = [];
    const monthlyAttendances = await Attendance.find().populate("employee");
    let count = 0;
    for (const attendance of monthlyAttendances) {
      const attendancesByMonth = {};
      const department = await getDepartment(attendance.employee.department[0]);
      const designation = await getDesignation(
        attendance.employee.designation[0]
      );
      const unit = await getUnit(attendance.employee.unit[0]);

      for (const record of attendance.attendances) {
        const date = new Date(record.checkOutDate);
        const monthYear = date.toLocaleString("default", {
          month: "long",
          year: "numeric",
        });

        if (!attendancesByMonth[monthYear]) {
          attendancesByMonth[monthYear] = [];
        }

        attendancesByMonth[monthYear].push(record);
      }

      const monthlyRecords = await Promise.all(
        Object.entries(attendancesByMonth).map(async ([month, records]) => {
          count++;
          const monthName = month.split(" ")[0];
          const totalCheckIns = records.filter((a) =>
            a.checkInDate.includes(monthName)
          ).length;
          const totalCheckOuts = records.filter((a) =>
            a.checkOutDate.includes(monthName)
          ).length;

          return {
            _id: attendance._id,
            count,
            fullName: attendance.employee.fullName,
            unit,
            department,
            designation,
            month,
            totalCheckIns,
            totalCheckOuts,
          };
        })
      );

      monthWiseAttendances.push({ monthlyRecords });
    }

    return monthWiseAttendances;
  } catch (error) {
    console.error(error);
    throw new Error("Internal Server Error");
  }
}

async function getAttendancesOfAMonth(_id, monthYear) {
  try {
    const year = monthYear.split(" ")[1];
    const month = monthYear.split(" ")[0];

    const attendance = await Attendance.findById(_id).populate("employee");
    const holidays = await Holiday.find();
    const allDates = getAllDatesOfMonth(year, month);

    const shift = await getShift(attendance.employee.shift);

    const employeeDetails = {
      monthYear: monthYear,
      fullName: attendance.employee.fullName,
      shift: `${shift.name} (${shift.timings.start} - ${shift.timings.end})`,
    };

    let count = 0;

    const newAttendance = allDates.map((d) => {
      count++;
      const holiday = holidays.find((h) => h.startDate === d.date);

      if (holiday) {
        return {
          count,
          date: d.date,
          day: d.day,
          checkIn: "--",
          checkOut: "--",
          status: "--",
          calender: holiday.name,
          backgroundColor: "#FDEB71",
          color: "#000",
        };
      }

      const attendanceOnDate = attendance.attendances.find(
        (a) => a.checkInDate === d.date
      );

      if (attendanceOnDate) {
        if (
          attendanceOnDate.checkInDay !== "Saturday" &&
          attendanceOnDate.checkInDay !== "Sunday"
        ) {
          let inTime = getTimeDifference(
            shift.timings.start,
            attendanceOnDate.checkInTime
          );

          let outTime = getTimeDifference(
            shift.timings.end,
            attendanceOnDate.checkOutTime
          );

          let status = outTime - inTime;

          return {
            count,
            date: d.date,
            day: d.day,
            checkIn: `${attendanceOnDate.checkInTime} (${attendanceOnDate.checkInStatus})`,
            checkOut: `${attendanceOnDate.checkOutTime} (${attendanceOnDate.checkOutStatus})`,
            status: `${status} mins`,
            calender: "WD",
            backgroundColor: "#FFF",
            color: "#000",
          };
        } else {
          return {
            count,
            date: d.date,
            day: d.day,
            checkIn: "--",
            checkOut: "--",
            status: "--",
            calender: "Weekend",
            backgroundColor: "#ABDCFF",
            color: "#000",
          };
        }
      } else {
        if (d.day !== "Saturday" && d.day !== "Sunday") {
          return {
            count,
            date: d.date,
            day: d.day,
            checkIn: "--",
            checkOut: "--",
            status: "--",
            calender: "Leave",
            backgroundColor: "#F05F57",
            color: "#000",
          };
        } else {
          return {
            count,
            date: d.date,
            day: d.day,
            checkIn: "--",
            checkOut: "--",
            status: "--",
            calender: "Weekend",
            backgroundColor: "#ABDCFF",
            color: "#000",
          };
        }
      }
    });

    return { employeeDetails, newAttendance };
  } catch (error) {
    console.error(error);
    return [];
  }
}

function getAllDatesOfMonth(year, monthName) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const monthIndex = monthNames.findIndex(
    (month) => month.toLowerCase() === monthName.toLowerCase()
  );

  if (monthIndex === -1) {
    throw new Error("Invalid month name");
  }

  const dates = [];
  const startDate = new Date(year, monthIndex, 1);
  const endDate = new Date(year, monthIndex + 1, 0);

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    const day = date.toLocaleString("default", { weekday: "long" });
    const formattedDate = `${String(date.getDate()).padStart(
      2,
      "0"
    )}-${monthName}-${year}`;
    dates.push({ day, date: formattedDate });
  }

  return dates;
}

function getTimeDifference(reportingTime, reportedTime) {
  const [startHour, startMinute, startPeriod] = reportingTime.split(/:| /);
  const [checkinHour, checkinMinute, checkinPeriod] = reportedTime.split(/:| /);

  let startTotalMinutes =
    parseInt(startHour, 10) * 60 + parseInt(startMinute, 10);
  let checkinTotalMinutes =
    parseInt(checkinHour, 10) * 60 + parseInt(checkinMinute, 10);

  if (startPeriod === "PM" && startHour !== "12") {
    startTotalMinutes += 12 * 60; // Convert PM hours to minutes
  }

  if (checkinPeriod === "PM" && checkinHour !== "12") {
    checkinTotalMinutes += 12 * 60; // Convert PM hours to minutes
  }

  const diffMinutes = checkinTotalMinutes - startTotalMinutes;

  return diffMinutes;
}
