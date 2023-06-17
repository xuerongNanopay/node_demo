const express = require('express')
const bodyParser = require('body-parser')

const feedRouter = require('./routes/feed');

const app = express();

// Request Encoder
app.use(bodyParser.json());

app.use((req, resp, next) => {
  resp.setHeader('Access-Control-Allow-Origin', '*');
  resp.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  resp.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.use('/feed', feedRouter);


app.use((err, req, resp, next) => {
  console.log(err);
  resp.status(407)
    .json({
      message: 'error'
    })
})

app.listen(3030);