const { Sequelize, DataTypes } = require('sequelize');

const dotenv = require('dotenv');

dotenv.config({ path: 'backend/src/config/.env' });

// const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

// const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
//   host: '127.0.0.1',
//   dialect: 'postgres',
// });

const POSTGRES_URL = process.env.DB_URI;
const sequelize = new Sequelize(POSTGRES_URL);
const connectDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = {
  connectDb, sequelize, Sequelize, DataTypes,
};
