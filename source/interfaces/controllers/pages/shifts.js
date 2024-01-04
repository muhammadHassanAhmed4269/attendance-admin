class Controller {
  constructor(page) {
    this.page = page;
  }

  async getShifts(req, res) {
    try {
      return await this.page.getShifts(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getShift(req, res) {
    try {
      return await this.page.getShift(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewShift(req, res) {
    try {
      return await this.page.addNewShift(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateShift(req, res) {
    try {
      return await this.page.updateShift(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
