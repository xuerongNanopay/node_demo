const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');
const express = require('express');


const router = express.Router();

//curl -F doc=@upload.txt http://localhost:3030/uploadfile 
router.post('/uploadfile', (req, resp, next) => {
  console.log(req.file)
  resp.send('success upload');
});

router.get('/uploadfile/:fileName', (req, resp, next) => {
  console.log('aa')
  const { fileName } = req.params;
  const invoidPath = path.join('upload', fileName)
  
  const pdfDoc = new PDFDocument()

  pdfDoc.pipe(fs.createWriteStream(invoidPath));
  pdfDoc.pipe(resp);
  
  pdfDoc.text('Hello world!');
  pdfDoc.end();
  // const file = fs.createReadStream(invoidPath);
  // file.pipe(resp);

  // fs.readFile(invoidPath, (err, data) => {
  //   if ( err ) {
  //     return next(err);
  //   }
  //   resp.send(data);
  // })
})

exports.routes = router;