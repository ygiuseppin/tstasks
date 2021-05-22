const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const UsersController = require('../controllers/Users');

router.post('/login', UsersController.userLogIn)

router.post('/signup', UsersController.userSignUp);

router.delete('/:userId', UsersController.deleteUser);

module.exports = router;