const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator');

const Post = require('../models/post');
const User = require('../models/user')

exports.getPosts = (req, resp, next) => {
  Post
    .find()
    .then(posts => {
      resp
        .status(200)
        .json({
          message: 'Posts found',
          posts: posts
        })
    })
    .catch(err => {
      if ( ! err.statusCode ) {
        err.statusCode = 500;
      }
      next(err);
    })
};

exports.createPosts = (req, res, next) => {
  const { title, content } = req.body;
  const { userId } = req;
  const errors = validationResult(req);
  let creator;

  if ( ! errors.isEmpty() ) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error
  }

  // if ( ! req.file ) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }

  const post = new Post({
    title,
    content,
    imageUrl: "TODO: req.file.path",
    creator: userId,
  })

  post
    .save()
    .then(result => {
      return User
        .findById(userId);
    })
    .then( user => {
      creator = user;
      user.posts.push(post);
      return user.save();
    })
    .then(result => {
      res
        .status(201)
        .json({
          message: 'Post created successfully',
          post: post,
          ceator: {_id: creator._id, name: creator.username}
        });
    })
    .catch(err => {
      if ( ! err.statusCode ) {
        err.statusCode = 500;
      }
      next(err);
    })
};

exports.getPost = (req, resp, next) => {
  const { postId } = req.params;
  Post
    .findById(postId)
    .then(post => {
      if ( ! post ) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        throw error;
      }

      resp
        .status(200)
        .json({
          message: 'Post found',
          post: post
        })
    })
    .catch(err => {
      if ( ! err.statusCode ) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.updatePost = (req, resp, next) => {
  const { postId } = req.params;
  const { title, content } = req.body;
  let imageUrl = req.body.imageUrl;
  //TODO: support image.
  // if ( req.file ) imageUrl = req.file.path;

  // if ( ! imageUrl ) {
  //   const error = new Error('No file picked.');
  //   error.statusCode = 422;
  //   throw error;
  // }

  Post
    .findById(postId)
    .then(post => {
      if ( ! post ) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      //TODO: protect
      // if ( post.creator.toString !== req.userId ) {
      //   const error = new Error('Not authorized');
      //   error.statusCode = 401;
      //   throw error;
      // }
      post.title = title;
      post.imageUrl = 'TOTO';
      post.content = content;
      return post.save()
        .then((result) => resp.status(200).json({
          message: 'update successfully',
          post: result
        }))
    })
    .catch(err => {
      if ( ! err.statusCode ) {
        err.statusCode = 500;
      }
      next(err);
    })
}

exports.deletePost = (req, resp, next)=> {
  let imageUrl;
  const { postId } = req.params;
  const { userId } = req;

  Post
    .findById(postId)
    .then(post => {
      if ( ! post ) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      //Check logged in User
      //clearImage(post.imageUrl);
      return Post
        .findByIdAndRemove(post)
    })
    .then(result => {
      return User.findById(userId);
    })
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => {
      resp
        .status(201)
        .json({
          message: 'Deleted post.'
        });
    })
    .catch(err => {
      if ( ! err.statusCode ) {
        err.statusCode = 500;
      }
      next(err);
    })
}

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
}