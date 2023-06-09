const path = require('path');

const express = require('express');

const router = express.Router();

router.get('/add-product', (req, resp, next) => {
  resp.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
})

router.post('/add-product', (req, resp, next) => {
  console.log(req.body);
  resp.redirect('/');
})

module.exports = router;