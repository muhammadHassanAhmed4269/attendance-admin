class Controller {
  constructor(page) {
    this.page = page;
  }

  async getDesignations(req, res) {
    try {
      return await this.page.getDesignations(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getDesignation(req, res) {
    try {
      return await this.page.getDesignation(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewDesignation(req, res) {
    try {
      return await this.page.addNewDesignation(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateDesignation(req, res) {
    try {
      return await this.page.updateDesignation(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
