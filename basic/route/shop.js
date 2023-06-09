const path = require('path')
const express = require('express');

const adminController = require('./admin')
const router = express.Router();

router.get('/', (res, resp, next) => {
  console.log(adminController.products)
  resp.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
})

module.exports = router;