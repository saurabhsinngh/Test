const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authentication').replace('Bearer ', '');

    if(!token){
        return res.status(401).json({ message : `Token is not found, Authorization denied` })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next();
    } catch (error) {
        res.status(400).json({message: `Token is not valid`})
    }
}

module.exports = verifyToken;
