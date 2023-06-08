const { sequelize, DataTypes } = require('../config/db');

const User = sequelize.define('User', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your name',
      },
      len: {
        args: [3, 32],
        msg: 'Your name must not exceed 32 characters',
      },
      trim: true,
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      msg: 'Please enter a valid email address.',
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 6,
      msg: 'Your password must be at least 6 characters',
    },

    // set(value) {
    //   this.setDataValue('password', hash(value));
    // },
  },
});

User.sync();

module.exports = User;
