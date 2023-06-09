const path = require('path');

const express = require('express');

const productController = require('../controller/admin');

const router = express.Router();

//curl http://localhost:3030/admin/products/0
router.get('/products/:productId', productController.getProductById);

//curl http://localhost:3030/admin/products
router.get('/products', productController.getAllProducts);

//curl http://localhost:3030/admin/products -X POST --data-urlencode "title=AAA" 
router.post('/products', productController.addProduct);

// module.exports = router;
exports.routes = router;