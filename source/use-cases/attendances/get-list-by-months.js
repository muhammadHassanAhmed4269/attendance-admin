class GetListByMonthsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async getListByMonths(req, res) {
    try {
      const monthWiseAttendances = [];
      const monthlyAttendances = await this.repository.find(
        {},
        null,
        "employee"
      );

      monthlyAttendances.forEach((attendance) => {
        const attendancesByMonth = {};

        attendance.attendances.forEach((record) => {
          const date = new Date(record.checkOutDate);
          const monthYear = date.toLocaleString("default", {
            month: "long",
            year: "numeric",
          });

          if (!attendancesByMonth[monthYear]) {
            attendancesByMonth[monthYear] = [];
          }

          attendancesByMonth[monthYear].push(record);
        });

        const totalCheckInAndOut = Object.entries(attendancesByMonth).map(
          ([month, records]) => {
            const monthName = month.split(" ")[0];
            const totalCheckIns = records.filter((a) =>
              a.checkInDate.includes(monthName)
            ).length;
            const totalCheckOuts = records.filter((a) =>
              a.checkOutDate.includes(monthName)
            ).length;

            return {
              month,
              totalCheckIns,
              totalCheckOuts,
            };
          }
        );

        monthWiseAttendances.push({
          _id: attendance._id,
          email: attendance.employee.email,
          totalCheckInAndOut,
        });
      });

      res.status(200).json(monthWiseAttendances);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
}

module.exports = GetListByMonthsUseCase;
