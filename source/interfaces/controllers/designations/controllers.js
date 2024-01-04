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

  async getDesignations(req, res) {
    try {
      return await this.getListUseCase.getDesignations(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getDesignation(req, res) {
    try {
      return await this.getUseCase.getDesignation(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewDesignation(req, res) {
    try {
      return await this.addNewUseCase.addNewDesignation(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateDesignation(req, res) {
    try {
      return await this.updateUseCase.updateDesignation(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteDesignation(req, res) {
    try {
      return await this.deleteUseCase.deleteDesignation(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
