'use strict';
const { bcrypt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        return bcrypt(instance.password)
          .then(hashed => {
            instance.password = hashed;
          })
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task);
  };
  return User;
};