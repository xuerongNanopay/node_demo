const http = require('http');
const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');

const rootDir = require('./util/path')
const User = require('./model/user_mysql')

//Configure and start essential components for the application.
require('./boot');

const adminRoute = require('./route/product');
const cartRoute = require('./route/cart')
const erroController = require('./controller/error')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')))

app.use((req, resp, next) => {
  User
    .findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
      resp.send('User no found');
    });
})

app.use('/admin', adminRoute.routes);
app.use(cartRoute.routes);
app.use('/', erroController.pageNoFund);

const server = http.createServer(app);

server.listen(3030)