const express = require('express');
const { query, check } = require('express-validator');

const authController = require('../controllers/auth_mongoose')


const router = express.Router();

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.post('/logout', authController.postLogout);

router.post('/signup', check('email').isEmail(), authController.postSignup);

router.get('/reset-password', authController.getReset);

router.post('/reset-password', authController.postReset);

router.post('/reset/:token', authController.postNowResetPassword);

exports.routes = router;