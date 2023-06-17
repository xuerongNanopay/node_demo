const express = require('express')
const bodyParser = require('body-parser')

const feedRouter = require('./routes/feed');

const app = express();

// Request Encoder
app.use(bodyParser.json());

app.use('/feed', feedRouter);


app.use((err, req, resp, next) => {
  console.log(err);
  resp.status(407)
    .json({
      message: 'error'
    })
})

app.listen(3030);