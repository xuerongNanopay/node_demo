const http = require('http');
const path = require('path')

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const bodyParser = require('body-parser');
const multer = require('multer')

const rootDir = require('./util/path')
// const User = require('./model/user_mysql')

//Configure and start essential components for the application.
require('./boot');

// const adminRoute = require('./route/product');
// const cartRoute = require('./route/cart')
// const erroController = require('./controller/error')

const adminRoute = require('./routes/admin')
const shopRoute = require('./routes/shop')
const authRoute = require('./routes/auth')
const fileRoute = require('./routes/file')
const erroController = require('./controller/error')

// const User = require('./models/user_vanilla')
const User = require('./models/user_mongoose')

const app = express();
//TODO: move this code to boot.js
const store = new MongoDBStore({
  uri: 'mongodb://root:123456@localhost:27017/product?authSource=admin',
  collection: 'sessions'
})

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'upload');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' +file.originalname);
  }
})

const fileFilter = (req, file, cb) => {
  if ( file.mimetype === 'text/plain') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('doc'));

//app.use(express.static(path.join(rootDir, 'public')))
app.use(session({
  secret: '123456',
  resave: false,
  saveUnitiialized: false,
  store: store
}));

app.use(fileRoute.routes);
app.use(authRoute.routes);
//TODO: move this function to middle ware.
app.use((req, resp, next) => {
  User
    .findById(req.session?.user?._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => {
      console.log(err);
      resp.send('Permission Error');
    })
})

//Todo permission check.
//app.use('/admin', adminRoute.routes);
app.use('/admin', adminRoute.routes);
app.use(shopRoute.routes);

app.use(erroController.pageNoFund);

//It is being called when you pass error in next callback.
//eg: next(new Error());
app.use((error, req, res, next) => {
  res.status(500).send('erroe');
})

const server = http.createServer(app);

server.listen(3030)