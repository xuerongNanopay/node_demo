const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require("jsonwebtoken");

const User = require('../models/user');

module.exports = {
  hello: _ => {
    return {
      test: 'Hello World',
      views: 123
    }
  },

  signInUser: async ({email, password}, req) => {
    const user = await User.findOne({email});
    if ( !user ) {
      const error = new Error('User not found.');
      error.code = 401;
      throw error;
    }
    console.log(user)
    const isMatch = await bcrypt.compare(user.password, password);
    if ( ! isMatch ) {
      const error = new Error('Password is incorrect');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign({
      userId: user._id.toString(),
      email: user.email
      },
      'mykey',
      {
        expiresIn: '1h'
      }
    )
    return {token, userId: user._id.toString()};
  },
  //TODO: fix up
  signUpUser: async (args, req) => {
    const { email, password } = args.userInput;

    const errors = [];
    if ( ! validator.isEmail(email) ) {
      errors.push({message: 'Email is invalid.'})
    }

    if ( errors.length > 0 ) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }

    const user = await User.findOne({email})
    if ( user ) {
      const error = new Error('user existing');
      throw error;
    }
    const isRightPassword = await bcrypt.compare(password, user.password)
    if ( ! isRightPassword ) {
      const error = new Error('Incorrect password');
      throw error;
    }

    return { ...user._doc, _id: user._id.toString() }
  }
}