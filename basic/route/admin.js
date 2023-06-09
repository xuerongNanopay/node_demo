const path = require('path');

const express = require('express');

const router = express.Router();

const products = [];

router.get('/add-product', (req, resp, next) => {
  resp.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'))
})

// curl http://localhost:3030/admin/add-product -X POST --data-urlencode "title=AAA"
router.post('/add-product', (req, resp, next) => {
  products.push({title: req.body.title});
  resp.send(products)
})

// module.exports = router;
exports.routes = router;
exports.products = products;