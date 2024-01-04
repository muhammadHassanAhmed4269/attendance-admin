class Controller {
  constructor(page) {
    this.page = page;
  }

  async getRoles(req, res) {
    try {
      return await this.page.getRoles(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getRole(req, res) {
    try {
      return await this.page.getRole(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewRole(req, res) {
    try {
      return await this.page.addNewRole(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateRole(req, res) {
    try {
      return await this.page.updateRole(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
