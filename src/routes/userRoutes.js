const express = require('express');
const { createUser, updateUser, deleteUser } = require('../controller/userController');
const verifyToken = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);

router.post('create', verifyToken, createUser);
router.post('update', verifyToken, updateUser);
router.post('delete', verifyToken, deleteUser)

module.exports = router;