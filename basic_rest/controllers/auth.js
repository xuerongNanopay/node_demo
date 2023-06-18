const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator')

const User = require('../models/user');

exports.signup = (req, resp, next) => {
  const errors = validationResult(req);

  if ( ! errors.isEmpty() ) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { email, username, password } = req.body;
  bcrypt
    .hash(password, 12)
    .then(password => {
      const user = new User({email, password, username});
      user
        .save()
        .then(user => {
          resp
            .status(1)
            .json({
              message: 'User created!',
              userId: user._id
            })
        })
    })
    .catch(err => {
      if ( ! err.statusCode ) {
        err.statusCode = 500;
      }
      next(err);
    });
  
}

const jwt = require("jsonwebtoken");

exports.login = (req, resp, next) => {
  const { email, password } = req.body;
  let loadedUser;
  User
    .findOne({email})
    .then(userDoc => {
      if ( ! userDoc ) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }
      loadedUser = userDoc;
      return bcrypt.compare(password, userDoc.password)
    })
    .then( isEqual => {
      if ( ! isEqual ) {
        const error = new Error("Wrong Password");
        error.statusCode = 401;
        throw error;
      }
      // create JWTs
      const token = jwt.sign(
                      {
                        email: loadedUser.email,
                        userId: loadedUser._id.toString()
                      }, 
                      'mySecurity',
                      { expiresIn: '1h'}
                    )
      resp.status(200).json({token, userId: loadedUser._id.toString()})
    })
    .catch(err => {
      if ( ! err.statusCode ) {
        err.statusCode = 500;
      }
      next(err);
    })
}