const Sequelize = require("sequelize");
const sequelize = require("../databases");

const User =  sequelize.define("user",{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },
    userId:{
        type: Sequelize.STRING,
        allowNull:false,
    },
    userPw:{
        type: Sequelize.STRING,
        allowNull:false,
    }
})

module.exports = User