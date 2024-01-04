class Controller {
  constructor(page) {
    this.page = page;
  }

  async getUnits(req, res) {
    try {
      return await this.page.getUnits(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getUnit(req, res) {
    try {
      return await this.page.getUnit(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewUnit(req, res) {
    try {
      return await this.page.addNewUnit(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateUnit(req, res) {
    try {
      return await this.page.updateUnit(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
