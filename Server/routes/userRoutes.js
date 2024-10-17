const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const userController = require('../controllers/UserController');

router.post('/register', upload.single('avatar'), userController.register);

router.post('/login', userController.login);

module.exports = router;