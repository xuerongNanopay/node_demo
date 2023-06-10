const express = require('express');

const cartController = require('../controller/shop');
const router = express.Router();

//curl http://localhost:3030/cart/products
router.get('/cart/products', cartController.getCart);
//curl http://localhost:3030/cart/products -X POST --data-urlencode "productId=1" 
router.post('/cart/products', cartController.postCart);

exports.routes = router;