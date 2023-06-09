const path = require('path')
const express = require('express');

const router = express.Router();

router.get('/', (res, resp, next) => {
  resp.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
})

module.exports = router;