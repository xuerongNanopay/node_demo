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