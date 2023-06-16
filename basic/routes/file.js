const express = require('express');


const router = express.Router();

//curl -F doc=@upload.txt http://localhost:3030/uploadfile 
router.post('/uploadfile', (req, resp, next) => {
  console.log(req.file)
  resp.send('success upload');
});

exports.routes = router;