'use strict';
const { bcrypt } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
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