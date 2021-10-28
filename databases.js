const { Sequelize } = require('sequelize');


// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test', 'root', 'alstjr5587', {
  host: 'localhost',
  port:"3306",
  dialect: 'mariadb'
}
);

module.exports = sequelize