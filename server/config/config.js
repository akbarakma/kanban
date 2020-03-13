require('dotenv').config();
module.exports = {
  "development": {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": "kanban",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "operatorsAliases": false
  },
  "production": {
    "username": "usfvsmpyopanhg",
    "password": "7fd4e4963e85157f4e18580cdb926b5c77d1caaf183ee5dfb77bb3f32d796785",
    "database": "dfk87v75vksh30",
    "host": "ec2-54-152-175-141.compute-1.amazonaws.com",
    "dialect": "postgres"
  }
}
