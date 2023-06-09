const path = require('path');

const express = require('express');

const productController = require('../controller/admin');

const router = express.Router();

//curl http://localhost:3030/admin/products/0
router.get('/products/:productId', (req, resp, next) => {
  productController.getProductById(req, resp, next);
})

//curl http://localhost:3030/admin/products
router.get('/products', (req, resp, next) => {
  productController.getAllProducts(req, resp, next);
})

//curl http://localhost:3030/admin/products -X POST --data-urlencode "title=AAA" 
router.post('/products', (req, resp, next) => {
  productController.addProduct(req, resp, next);
})

// module.exports = router;
exports.routes = router;