const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate().then(() => {
    console.log(`Database connected Successfully::`)
}).catch((err) => {
    console.log(`Error in database connection::`, err);
});

module.exports = sequelize;