class Controller {
  constructor(page) {
    this.page = page;
  }

  async getDepartments(req, res) {
    try {
      return await this.page.getDepartments(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getDepartment(req, res) {
    try {
      return await this.page.getDepartment(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewDepartment(req, res) {
    try {
      return await this.page.addNewDepartment(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateDepartment(req, res) {
    try {
      return await this.page.updateDepartment(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
