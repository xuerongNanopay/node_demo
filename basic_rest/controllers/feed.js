const fs = require('fs');
const path = require('path');

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

  // if ( ! req.file ) {
  //   const error = new Error('No image provided.');
  //   error.statusCode = 422;
  //   throw error;
  // }

  const post = new Post({
    title,
    content,
    imageUrl: req.file.path,
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
        .then(result => {
          console.log(result);
          resp
            .status(201)
            .json({
              message: 'Deleted post.'
            });
        })

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