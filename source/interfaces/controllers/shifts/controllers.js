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

  async getShifts(req, res) {
    try {
      return await this.getListUseCase.getShifts(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getShift(req, res) {
    try {
      return await this.getUseCase.getShift(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewShift(req, res) {
    try {
      return await this.addNewUseCase.addNewShift(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateShift(req, res) {
    try {
      return await this.updateUseCase.updateShift(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteShift(req, res) {
    try {
      return await this.deleteUseCase.deleteShift(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
