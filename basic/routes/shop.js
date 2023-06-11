const express = require('express');

const shopController = require('../controllers/shop')

const router = express.Router();

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.post('/cart', shopController.postCart);

router.get('/cart', shopController.getCart)

router.post('/cart-delete-item', shopController.postCartDeleteProduct)

router.post('/create-order', shopController.postOrder)

router.get('/order', shopController.getOrders)

// router.post('/add-product', adminController.postAddProduct);

exports.routes = router;