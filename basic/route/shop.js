const express = require('express');

const router = express.Router();

router.get('/', (res, resp, next) => {
  resp.send('<h1>This is shop</h1>');
})

module.exports = router;