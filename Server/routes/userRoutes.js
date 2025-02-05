const express = require('express');
const router = express.Router();
const upload = require('../utils/multer');

const userController = require('../controllers/UserController');
const { isAuthenticated } = require('../middlewares/auth');

router.post('/register', upload.single('avatar'), userController.register);

router.post('/login', userController.login);

router.get('/getsingle/:id', isAuthenticated, userController.getSingleUser);

router.put('/update/:id', isAuthenticated, upload.single('avatar'), userController.updateUser);

router.get('/sendcode/:id', isAuthenticated, userController.sendCode);

router.post('/verifycode/:id', isAuthenticated, userController.verifyCode);

router.get('/all', userController.listAll);

router.delete('/delete/:id', userController.deleteUser);

router.put('/update/role/:id', userController.updateRole);

router.get('/active', userController.getActiveUsers);

// Add the new route for fetching the number of users
// router.get('/users/number', userController.getNumberOfUsers);

module.exports = router;