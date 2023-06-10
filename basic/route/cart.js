const express = require('express');

const cartController = require('../controller/shop');
const router = express.Router();

router.get('/cart/products', cartController.getCart);

exports.routes = router;