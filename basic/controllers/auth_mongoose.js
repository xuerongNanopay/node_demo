exports.getLogin = ( req, resp, next ) => {

  resp.send('Please Login: ' + req.get('Cookie'))
}

exports.postLogin = (req, resp, next) => {
  req.session.isLoggedIn = true;
  resp.send('TODO: login success')
}