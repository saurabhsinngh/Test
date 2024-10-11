const User = require('../models/user');
const bcrypt = require(bcryptjs);
const jwt = require('jsonwebtoken');
require('dotenv').config

// Create a new user
exports.createUser = async (req, res) => {
    const { name, email, password, roleId } = req.body;
    try {
        let user = await User.findOne({
            where: {
                email : email
            }
        })

        if(user){
            return res.status(400).json({ message: `User is alreeady Exist`})
        }

        const salt = await bcrypt.genSalt(10);
        const hassedPassword = await bcrypt.has(password, salt);

        user = await User.create({ name, email, password : hassedPassword, roleId: roleId || 1})
        res.status(201).json({ message: 'User created Successfully', user})
    
    } catch (error) {
        res.status(500).json({ message: `Server error`});
    }
}

// Update User

exports.updateUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.params.id;

    try {
        let user = await User.findByPk(userId);

        if(!user){
            return res.status(404).json({ message: 'User not found '})
        }

        // If password is provided, hash it
        if( password){
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.has(password, salt);
        }

        user.name = name || user.name;
        user.email = email || user.email;

        await user.save();
        res.status(200).json({ message: `User updated successfully`});
    } catch (error) {
        res.status(500).json({ message: `Server error`});
    }
}

exports.deleteUser = async( req, res) => {
    const userId = req.params.id
    try {
        let user = await User.findByPk(userId);

        if(!user){
            return res.status(404).json({ message: 'User not found '})
        }

        // Prevent user delete own account
        if(req.user.userId === user.id){
            return res.status(404).json({ message: `User can't delete your own account`})
        }

        await user.destroy();
        res.status(200).json({ message: `User deleted successfully`});

    } catch (error) {
        res.status(500).json({ message: `Server error`});
    }
}
