const express = require('express');

const authController = require('../controllers/auth_mongoose')

const router = express.Router();

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

exports.routes = router;