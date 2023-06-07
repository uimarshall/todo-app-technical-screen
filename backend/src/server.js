const express = require('express');
const dotenv = require('dotenv');
const { connectDb, sequelize } = require('./config/db');

// Load the environment variables
dotenv.config({ path: 'backend/src/config/.env' });
const app = express();

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(
    `🚀Server is running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
  await connectDb();
  sequelize.sync({ force: false }).then(() => {
    console.log('✅Synced database successfully...');
  });
});
