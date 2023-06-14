const express = require('express');
const { body, check } = require('express-validator');

const User = require('../models/user_mongoose')
const authController = require('../controllers/auth_mongoose')


const router = express.Router();

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.post('/logout', authController.postLogout);

router.post(
  '/signup', 
  check('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .normalizeEmail()
    .custom((value, {req}) =>{
      // if ( value === "noAllowEmail@xrw.io" ) {
      //   throw new Error('This email address if forbidden');
      // }
      // return true;
      return User.findOne({email:value})
        .then(userDoc => {
          if (userDoc) {
            return Promise.reject('Email already existing');
          }
        })
    }),
  body('password')
    .isLength({min: 5})
    .withMessage('Please enter valid password')
    .isAlphanumeric()
    .trim(),
  authController.postSignup
);

router.get('/reset-password', authController.getReset);

router.post('/reset-password', authController.postReset);

router.post('/reset/:token', authController.postNowResetPassword);

exports.routes = router;