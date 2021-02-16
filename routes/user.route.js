const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');

router.post('/register', userController.createAccount);
router.post('/login',userController.authenticate);
router.get('/getUsers',userController.getAllUsers);
router.post('/sendMail',userController.sendMail);

module.exports = router;