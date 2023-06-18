const { validationResult } = require('express-validator');

const Post = require('../models/post');

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
  const errors = validationResult(req);

  if ( ! errors.isEmpty() ) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422;
    throw error
  }

  const post = new Post({
    title,
    content,
    imageUrl: 'TODO',
    creator: { name: 'TODO' },
  })

  post
    .save()
    .then(result => {
      res
        .status(201)
        .json({
          message: 'Post created successfully',
          post: result
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