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

  async getDepartments(req, res) {
    try {
      return await this.getListUseCase.getDepartments(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async getDepartment(req, res) {
    try {
      return await this.getUseCase.getDepartment(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async addNewDepartment(req, res) {
    try {
      return await this.addNewUseCase.addNewDepartment(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateDepartment(req, res) {
    try {
      return await this.updateUseCase.updateDepartment(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteDepartment(req, res) {
    try {
      return await this.deleteUseCase.deleteDepartment(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
