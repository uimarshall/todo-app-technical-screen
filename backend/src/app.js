const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');

// Load the environment variables
dotenv.config({ path: 'backend/src/config/.env' });

// Routes
const userAuthRoutes = require('./routes/userAuth');

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes Middleware

app.use('/api/v1/user', userAuthRoutes);

// A catch-all route for anything the web service does not define.
app.get('*', (req, res) => res.status(404).send({
  message: 'No Todos to see here, make sure you used the correct Link!',
}));

module.exports = app;
