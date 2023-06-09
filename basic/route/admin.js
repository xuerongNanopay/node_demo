const express = require('express');

const router = express.Router();

router.get('/product', (req, resp, next) => {
  console.log('In another middleware');
  // resp.send("<h1>Hello from Express!</h1>");
  // resp.send({11: 11, 22: 22});
  resp.send('<form action="/admin/add-user" method="POST"><input type="text" name="title"/><button type="submit">Add user</button></form>');
})

router.post('/add-product', (req, resp, next) => {
  console.log(req.body);
  resp.redirect('/');
})

module.exports = router;