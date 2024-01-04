class Controller {
  constructor(page) {
    this.page = page;
  }

  async getDashboard(req, res) {
    try {
      return await this.page.getDashboard(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
