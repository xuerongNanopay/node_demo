const express = require('express');

const adminController = require('../controllers/admin')

const router = express.Router();

router.get('/add-product', adminCountroller.getAddProduct);

router.post('add-product', adminController.postAddProduct);

