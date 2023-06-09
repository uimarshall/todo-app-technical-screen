const app = require('./app');
// const { connectDb, sequelize } = require('./config/db');
const db = require('./models');

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(
    `🚀Server is running on port ${port} in ${process.env.NODE_ENV} mode`,
  );
  // await connectDb();
  db.sequelize.sync({ force: true }).then(() => {
    console.log('✅Synced database successfully...');
  });
});
