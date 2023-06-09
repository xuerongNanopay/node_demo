const http = require('http');
const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path')

const adminController = require('./route/admin');
const shopRoute = require('./route/shop')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminController.routes);
app.use(shopRoute);

app.use((req, resp, next) => {
  resp.status(404).sendFile(path.join(rootDir, 'views', 'page-no-found.html'));
})

const server = http.createServer(app);

server.listen(3030)