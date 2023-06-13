const express = require('express');

const adminController = require('../controllers/admin_mongoose')
const isAuth = require('../middleware/is-auth')

const router = express.Router();

router.get('/add-product', isAuth, adminController.getAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.post('/add-product', isAuth, adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.delete('/products/:productId', isAuth, adminController.deleteProduct);


exports.routes = router;