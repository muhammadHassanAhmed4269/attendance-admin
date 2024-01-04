class Controller {
  constructor(page) {
    this.page = page;
  }

  async getEmployees(req, res) {
    try {
      return await this.page.getEmployees(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewEmployee(req, res) {
    try {
      return await this.page.addNewEmployee(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateEmployee(req, res) {
    try {
      return await this.page.updateEmployee(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
