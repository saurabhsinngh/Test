const { DataTypes } = require('sequelize');
const sequelize = require('../../config/db')

const User = sequelize.define('user', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId:{
        type: DataTypes.STRING,
        defaultValue: 1
    },
});

module.exports = User;