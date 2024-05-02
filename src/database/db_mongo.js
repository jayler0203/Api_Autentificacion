const mongoose = require('mongoose');
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;
const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;

class Database {
  constructor() {
    this.isConnected = false;
  }

  async connect() {
    try {
      if (!this.isConnected) {
        const uri = `mongodb://${username}:${password}@${host}:${port}`;
        await mongoose.createConnection(uri, {dbName:"auth",});
        this.isConnected = true;
        console.log('Conexión exitosa');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
    }
  }

  disconnect() {
    if (this.isConnected) {
      mongoose.disconnect();
      this.isConnected = false;
      console.log('Desconexión exitosa');
    }
  }
}

const database = new Database();

module.exports = database;

