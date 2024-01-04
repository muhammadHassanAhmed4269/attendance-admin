class Controller {
  constructor(authUseCase) {
    this.authUseCase = authUseCase;
  }

  async getLogin(req, res) {
    try {
      return await this.authUseCase.login(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getLogout(req, res) {
    try {
      return await this.authUseCase.logout(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
