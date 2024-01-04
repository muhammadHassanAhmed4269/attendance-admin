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

  async getPermissions(req, res) {
    try {
      return await this.getListUseCase.getPermissions(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getPermission(req, res) {
    try {
      return await this.getUseCase.getPermission(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewPermission(req, res) {
    try {
      return await this.addNewUseCase.addNewPermission(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updatePermission(req, res) {
    try {
      return await this.updateUseCase.updatePermission(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deletePermission(req, res) {
    try {
      return await this.deleteUseCase.deletePermission(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
