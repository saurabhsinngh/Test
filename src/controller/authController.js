const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { match } = require('assert');
require('dotenv').config();

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({
            where: {
                email : email
            }
        })

        if(user){
            return res.status(400).json({ message: 'User is already exist'});
        }

        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.has(password, salt);

        user = await User.create({ name, email, password: hassedPassword});

        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h'});
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: `Server error`});
    }
}

// Login of a user
exports.login = async ( req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({
            where: {
                email : email
            }
        })    

        if(!user){
            return res.status(400).json({ message : `Invalid credentials`});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({ message : `Invalid credentials`});
        }

        const payload = { userId: user.id};

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h'});
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: `Server error`});
    }

}