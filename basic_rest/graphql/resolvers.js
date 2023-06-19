const bcrypt = require('bcryptjs');
const validator = require('validator')

const User = require('../models/user');

module.exports = {
  hello: _ => {
    return {
      test: 'Hello World',
      views: 123
    }
  },
  signInUser: async (args, req) => {
    const { email, password } = args.userInput;

    const errors = [];
    if ( ! validator.isEmail(email) ) {
      errors.push({message: 'Email is invalid.'})
    }

    const user = await User.findOne({email})
    if ( ! user ) {
      const error = new Error('no user found');
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