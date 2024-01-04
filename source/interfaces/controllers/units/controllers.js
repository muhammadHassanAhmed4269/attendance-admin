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

  async getUnits(req, res) {
    try {
      return await this.getListUseCase.getUnits(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getUnit(req, res) {
    try {
      return await this.getUseCase.getUnit(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewUnit(req, res) {
    try {
      return await this.addNewUseCase.addNewUnit(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateUnit(req, res) {
    try {
      return await this.updateUseCase.updateUnit(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteUnit(req, res) {
    try {
      return await this.deleteUseCase.deleteUnit(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
