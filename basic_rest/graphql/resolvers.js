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
    const isMatch = await bcrypt.compare(password, user.password);
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

  signUpUser: async (args, req) => {
    const { username, email, password } = args.userInput;

    let user = await User.findOne({email})
    if ( user ) {
      const error = new Error('user existing');
      throw error;
    }

    const hashPasswd = await bcrypt.hash(password, 12);
    user = new User({username, email, password: hashPasswd})
    user = await user.save();

    return { ...user._doc, _id: user._id.toString() }
  },

  //TODO: input into mongodb
  createPost: ({ postInput }, req) => {
    const errors = []
    if ( validator.isEmpty(postInput.title) ||
        ! validator.isLength(postInput.title, { min: 5})
    ) {
      errors.push({message: 'Title is invalid.'});
    }
  }
}