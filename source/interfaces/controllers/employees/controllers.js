class Controller {
  constructor(
    // getListUseCase,
    // getUseCase,
    addNewUseCase,
    updateUseCase,
    deleteUseCase
  ) {
    // this.getListUseCase = getListUseCase;
    // this.getUseCase = getUseCase;
    this.addNewUseCase = addNewUseCase;
    this.updateUseCase = updateUseCase;
    this.deleteUseCase = deleteUseCase;
  }

  // async getEmployees(req, res) {
  //   try {
  //     return await this.getListUseCase.getEmployees(req, res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // async getEmployee(req, res) {
  //   try {
  //     return await this.getUseCase.getEmployee(req, res);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  async addNewEmployee(req, res) {
    try {
      return await this.addNewUseCase.addNewEmployee(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateEmployee(req, res) {
    try {
      return await this.updateUseCase.updateEmployee(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteEmployee(req, res) {
    try {
      return await this.deleteUseCase.deleteEmployee(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
