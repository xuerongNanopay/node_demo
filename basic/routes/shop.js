const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.post('/cart', shopController.postCart);

// router.post('/add-product', adminController.postAddProduct);

exports.routes = router;