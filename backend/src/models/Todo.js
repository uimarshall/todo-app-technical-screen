const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Todo = sequelize.define('todos', {
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your todo',
        },
      },
    },
    description: {
      type: DataTypes.STRING,
    },

    priority: {
      type: DataTypes.STRING,
    },
    complete: {
      type: DataTypes.Boolean,
      defaultValue: false,
    },
  });

  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'todoId',
      onDelete: 'CASCADE',
    });
  };

  return Todo;
};
