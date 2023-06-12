const User = require('../models/user_mongoose')

exports.getLogin = ( req, resp, next ) => {

  resp.send('Please Login: ' + req.get('Cookie'))
}

exports.postLogin = (req, resp, next) => {
  User
  .findOne({username: 'admin'})
  .then(user => {
    req.session.isLoggedIn = true;
    req.session.user = user;
    req.session.save((err) => {
      console.log(err);
      resp.send('login success');
    });
  })
  .catch(err => {
    console.log(err);
    resp.send('Permission Error');
  })
}

exports.postLogout = (req, resp, next) => {
  req.session.destroy(err => {
    resp.send('Token destory: ' + req.session)
  });
}