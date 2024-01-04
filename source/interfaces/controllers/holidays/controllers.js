class Controller {
  constructor(addNewUseCase, updateUseCase, deleteUseCase) {
    this.addNewUseCase = addNewUseCase;
    this.updateUseCase = updateUseCase;
    this.deleteUseCase = deleteUseCase;
  }

  async addNewHoliday(req, res) {
    try {
      return await this.addNewUseCase.addNewHoliday(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async updateHoliday(req, res) {
    try {
      return await this.updateUseCase.updateHoliday(req, res);
    } catch (error) {
      console.error(error);
    }
  }

  async deleteHoliday(req, res) {
    try {
      return await this.deleteUseCase.deleteHoliday(req, res);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Controller;
