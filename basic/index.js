const http = require('http');
const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/path')

//Configure and start essential components for the application.
require('./boot');

const adminRoute = require('./route/admin');
const erroController = require('./controller/error')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir, 'public')))

app.use('/admin', adminRoute.routes);

app.use('/', erroController.pageNoFund);

const server = http.createServer(app);

server.listen(3030)