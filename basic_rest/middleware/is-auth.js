const jwt = require('jsonwebtoken')

module.exports = ( req, resp, next ) => {
  const auth = req.get('Authorization');
  if ( ! auth ) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  const token = req.get('Authorization').split(' ')[1];
  if ( ! token ) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, 'mySecurity');
  } catch ( err ) {
    err.statusCode = 500;
    throw err;
  }

  if ( ! decodedToken ) {
    const error = new Error('Not authenticated');
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodedToken.userId;
  req.email = decodedToken.email;
  next()
}