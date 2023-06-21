const path = require('path');

const express = require('express')
const multer = require('multer');
const bodyParser = require('body-parser')
var { graphqlHTTP } = require("express-graphql")
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const auth = require('./middleware/is-auth')


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

  if ( req.method === "OPTIONS" ) return res.sendStatus(200);
  next();
});

//TODO: Authenticate.
app.put("/post-image", (req, resp, next) => {
  if ( ! req.file ) {
    return resp.status(200).json({ message: 'No file provided'});
  }
  if ( req.body.oldPath) {
    //TODO: clean up old path
  }

  return res.status(201).json({message: 'File Stored', filePath: req.file.path})
});

app.use(auth);

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true,
  //Handle error from graphql
  customFormatErrorFn: (err) => {
    console.log(err)
    if ( ! err.originalError ){
      return err;
    }

    const data = err.originalError.data;
    const message = err.message || 'An error occurred.';
    const status = err.originalError.code || 500;
    return { message, status, data}
  }
}))

app.use((err, req, resp, next) => {
  console.log(err);
  resp
    .status(err.statusCode || 500)
    .json({
      message: err.message,
      data: err.data
    })
})

const bootApp = async _ => {
  const bootFunc = require('./boot');
  await bootFunc();
  const server = app.listen(3030);
}
bootApp();