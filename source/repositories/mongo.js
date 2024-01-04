class Repository {
  constructor(model) {
    this.model = model;
  }

  async find(query = {}, select = null, populate = null) {
    try {
      let q = this.model.find(query);
      if (select) q = q.select(select);
      if (populate) q = q.populate(populate);
      return await q.exec();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to find data: ${error.message}`);
    }
  }

  async findOne(query = {}, select = null, populate = null) {
    try {
      let q = this.model.findOne(query);
      if (select) q = q.select(select);
      if (populate) q = q.populate(populate);
      return await q.exec();
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to find one data: ${error.message}`);
    }
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to create data: ${error.message}`);
    }
  }

  async findOneAndUpdate(query, data, options) {
    try {
      return await this.model.findOneAndUpdate(query, data, options);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to find one and update data: ${error.message}`);
    }
  }

  async findOneAndDelete(query) {
    try {
      return await this.model.findOneAndDelete(query);
    } catch (error) {
      console.error(error);
      throw new Error(`Failed to find one and delete data: ${error.message}`);
    }
  }

  // Optional: Add methods to support transactions if your database allows
  async startTransaction() {
    // Implement logic to start a transaction
  }

  async commitTransaction() {
    // Implement logic to commit a transaction
  }

  async rollbackTransaction() {
    // Implement logic to rollback a transaction
  }
}

module.exports = Repository;
