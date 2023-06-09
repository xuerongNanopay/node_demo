const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require("jsonwebtoken");

const User = require('../models/user');
const Post = require('../models/post')

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

  createPost: async ({ postInput: {title, content} }, req) => {

    if ( ! req.isAuth ) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }

    let user = await User.findById(req.userId);
    if ( ! user ) {
      const error = new Error('Invalid User');
      error.code = 401;
      throw error;
    }
    let newPost = new Post({title, content, imageUrl:'TODO', creator: user});
    newPost = await newPost.save();
    //
    await user.posts.push(newPost);

    return {...newPost._doc, _id: newPost._id.toString()}
  },

  fetchPosts: async ({page}, req) => {
    //TODO: auth
    if ( !page ) {
      page = 1;
    }
    const PER_PAGE = 10;
    const totalPosts = await Post.find().countDocuments();
    const posts = await Post
                        .find()
                        .sort({createAt: -1})
                        .skip((page-1)*PER_PAGE)
                        .limit(PER_PAGE)
                        .populate('creator');
    return { posts: posts.map(p => ({...p._doc, _id: p._id.toString()})), totalPosts };
  },

  fetchPostById: async ({id}, req) => {
    
    // if ( ! req.isAuth ) {
    //   const error = new Error('Not authenticated');
    //   error.code = 401;
    //   throw error;
    // }

    const post = await Post.findById(id).populate('creator');
    if ( ! post ) {
      const error = new Error('No post found!');
      error.code = 404;
      throw error
    }

    return {
      ...post._doc,
      _id: post._id.toString()
    }
  },

  updatePost: async ({id, postInput}, req) => {

        // if ( ! req.isAuth ) {
    //   const error = new Error('Not authenticated');
    //   error.code = 401;
    //   throw error;
    // }

    const post = await Post.findById(id).populate('creator');
    if ( ! post ) {
      const error = new Error('No post found!');
      error.code = 404;
      throw error
    }

    // if ( post.creator._id.toString() !== req.userId.toString() ) {
    //   const error = new Error('No permission!');
    //   error.code = 401;
    //   throw error
    // }

    //TODO: validation on postInput
    return {}
  }
}

