const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth')

const  router = express.Router();

router.get('/posts', isAuth, feedController.getPosts);
router.post('/posts', [
  body('title').trim().isLength({min: 5}),
  body('content').trim().isLength({min: 5})
], isAuth, feedController.createPosts);

router.get('/post/:postId', feedController.getPost);

router.put('/post/:postId', feedController.updatePost);

router.delete('post/:postId', feedController.deletePost);

module.exports = router;

