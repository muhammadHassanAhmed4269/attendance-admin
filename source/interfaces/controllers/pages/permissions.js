class Controller {
  constructor(page) {
    this.page = page;
  }

  async getPermissions(req, res) {
    try {
      return await this.page.getPermissions(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewPermission(req, res) {
    try {
      return await this.page.addNewPermission(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updatePermission(req, res) {
    try {
      return await this.page.updatePermission(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
