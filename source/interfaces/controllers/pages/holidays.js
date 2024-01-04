class Controller {
  constructor(page) {
    this.page = page;
  }

  async getHolidays(req, res) {
    try {
      return await this.page.getHolidays(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewHoliday(req, res) {
    try {
      return await this.page.addNewHoliday(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateHoliday(req, res) {
    try {
      return await this.page.updateHoliday(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
