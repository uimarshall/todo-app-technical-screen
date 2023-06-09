/* eslint-disable no-underscore-dangle */
/* eslint-disable comma-dangle */
/* eslint-disable no-return-assign */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name',
        },
        len: {
          args: [3, 32],
          msg: 'Your name must not exceed 32 characters',
        },
      },
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: { msg: 'Please enter a valid email address' },
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  User.addHook(
    'beforeCreate',
    (user) => (user.password = bcrypt.hashSync(user.password, 10))
  );

  User.prototype.testMethod = function () {
    console.log('This is an instance method log');
  };

  // Return JWT token
  User.prototype.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
  };

  // Generate password reset token(3:55)

  User.prototype.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash/encrypt token and set to resetPasswordToken
    // This is saved in the database
    this.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set token expire time in seconds(30mins)
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;
    return resetToken;
  };

  return User;
};
