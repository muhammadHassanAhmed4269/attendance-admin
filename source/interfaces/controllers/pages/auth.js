class Controller {
  constructor(page) {
    this.page = page;
  }

  async getLogin(req, res) {
    try {
      return await this.page.getLogin(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getLogout(req, res) {
    try {
      return await this.page.getLogout(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
