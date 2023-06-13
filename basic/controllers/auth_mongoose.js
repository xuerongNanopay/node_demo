const bcrypt = require('bcryptjs');
const User = require('../models/user_mongoose')

exports.getLogin = ( req, resp, next ) => {

  resp.send('Please Login: ' + req.get('Cookie'))
}

exports.postLogin = (req, resp, next) => {
  const { email, password } = req.body;
  User
  .findOne({email})
  .then(user => {
    if ( ! user ) return resp.send('No user found');
    
    return bcrypt
      .compare(password, user.password)
      .then(doMatch => {
        if ( doMatch ) {
          req.session.isLoggedIn = true;
          req.session.user = user;
          return req.session.save((err) => {
            console.log(err);
            resp.send('login success');
          });
        } else {
          return req.send('Password wrong');
        }
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

exports.postSignup = (req, resp, next) => {
  const { email, username, password } = req.body;
  //TODO: validate user input
  User
    .findOne({email})
    .then(user => {
      if ( !! user ) {
        resp.send("Email is already exist");
        return undefined;
      } else {
        return bcrypt.hash(password, 12)
          .then(password => {
            const user = new User ({
              email, 
              username, 
              password,
              cart: { items: [] }
            });
            return user.save()
          })
          .then(result => {
            resp.send(result);
          })
      }
    })
    .catch( err => {
      console.log(err);
      resp.send("postSignup error");
    })
}