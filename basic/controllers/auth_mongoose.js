const crypto = require('crypto');


const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

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
  const error = validationResult(req);
  console.log(error);
  if ( ! error.isEmpty() ) return resp.status(422).send(error);

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
    .catch( err => {
      console.log(err);
      resp.send("postSignup error");
    })
}

exports.getReset = (req, resp, next) => {
  res.send('Reset message send');
}

exports.postReset = (req, resp, next) => {
  crypto.randomBytes(32, (err, buffer) => {
    if ( err ) {
      console.log(err);
      return resp.send('Error: postReset');
    }
    const token = buffer.toString('hex');
    User
      .findOne({email: req.body.email})
      .then(user => {
        console.log(user._id);
        if ( ! user ) {
          return resp.send('No account found');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000;
        return user.save().then(user => resp.send(user));
      })
      .catch(err => {
        console.log(err);
        return resp.send('Error: postReset')
      })
  })
}

exports.postNowResetPassword = (req, resp, next) => {
  const {token} = req.params;
  const {password} = req.body;
  console.log(token, password)
  User.findOne({
    resetToken: token, 
    resetTokenExpiration: {$gt: Date.now()}}
  )
  .then(user => {
    if ( ! user ) {
      return resp.send('user no found');
    }

    return bcrypt
      .hash(password, 12)
      .then(password => {
        user.password = password;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        return user
          .save()
          .then(user => {
            return resp.send(user);
          })
      })
  })
  .catch(err => {
    console.log(err);
    return resp.send('Error: postResetPassword')
  })

}