const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoute = require('./route/admin');
const shopRoute = require('./route/shop')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoute);
app.use('/shop', shopRoute);

app.use((req, resp, next) => {
  resp.send('<h1>Page not found</h1>');
})

const server = http.createServer(app);

server.listen(3030)