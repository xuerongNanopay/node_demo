exports.getLogin = ( req, resp, next ) => {

  resp.send('Please Login: ' + req.get('Cookie'))
}

exports.postLogin = (req, resp, next) => {
  resp.setHeader('Set-Cookie', 'loggedIn=true; Max-Age=10');
  resp.send('TODO: login success')
}