const path = require('path');

const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, resp, next) => {
  resp.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
})

router.post('/add-product', (req, resp, next) => {
  products.push({title: req.body.title});
  resp.redirect('/');
})

// module.exports = router;
exports.routes = router;
exports.products = products;