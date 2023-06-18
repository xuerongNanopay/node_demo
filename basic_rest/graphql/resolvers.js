const bcrypt = require('bcryptjs');

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

    const user = await User.findOne({email})
    if ( ! user ) {
      const error = new Error('no user found');
      throw error;
    } 
    return { ...user._doc, _id: user._id.toString() }
  }
}