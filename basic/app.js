const http = require('http');

function requestListener(req, res) {

}

// http.createServer(requestListener);
const server = http.createServer((req, res) => {
  const body = [];
  req.on('data', (chunk) => {
    body.push(chunk)
    console.log(chunk)
  });
  req.on('end', () => {
    const parseBody = Buffer.concat(body).toString();
    console.log(parseBody)
    res.end()
  })
})

server.listen(3030);