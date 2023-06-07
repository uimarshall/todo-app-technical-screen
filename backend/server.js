const express = require('express');
const dotenv = require('dotenv');

// Load the environment variables
dotenv.config({ path: 'backend/config/.env' });
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Server is running on port ${port} in ${process.env.NODE_ENV} mode.`,
  );
});
