require('./boot');

const path = require('path');

const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser')

const feedRouter = require('./routes/feed');
const authRouter = require('./routes/auth')

const app = express();

// Request Encoder
app.use(bodyParser.json());
// static images folder
app.use('images', express.static(path.join(__dirname, 'images')));
// upload file management.
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + '-' + file.originalname);
  }
})
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.minetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.use((req, resp, next) => {
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  resp.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRouter);
app.use('/auth', authRouter);


app.use((err, req, resp, next) => {
  console.log(err);
  resp
    .status(err.statusCode || 500)
    .json({
      message: error.message,
      data: error.data
    })
})

app.listen(3030);