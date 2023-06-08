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
  return User;
};
