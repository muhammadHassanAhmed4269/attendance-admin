class Controller {
  constructor(
    getListUseCase,
    getUseCase,
    addNewUseCase,
    updateUseCase,
    deleteUseCase
  ) {
    this.getListUseCase = getListUseCase;
    this.getUseCase = getUseCase;
    this.addNewUseCase = addNewUseCase;
    this.updateUseCase = updateUseCase;
    this.deleteUseCase = deleteUseCase;
  }

  async getRoles(req, res) {
    try {
      return await this.getListUseCase.getRoles(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getRole(req, res) {
    try {
      return await this.getUseCase.getRole(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewRole(req, res) {
    try {
      return await this.addNewUseCase.addNewRole(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateRole(req, res) {
    try {
      return await this.updateUseCase.updateRole(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteRole(req, res) {
    try {
      return await this.deleteUseCase.deleteRole(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
