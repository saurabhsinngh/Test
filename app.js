const express = require('express');
const dotenv = require('dotenv');
const sequelize = require('./config/db')
const bodyParser = require('body-parser')

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/auth', require('./src/routes/authRoutes'));
app.use('/api/auth', require('./src/routes/userRoutes'));

sequelize.sync().then(() => {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`Server is listening on the ${port}`)
    });
});