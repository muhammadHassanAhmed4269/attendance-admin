class Controller {
  constructor(page) {
    this.page = page;
  }

  async getAttendances(req, res) {
    try {
      return await this.page.getAttendances(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getAttendance(req, res) {
    try {
      return await this.page.getAttendance(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
