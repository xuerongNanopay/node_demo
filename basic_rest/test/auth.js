const {expect} = require('chai');
const auth = require('../middleware/is-auth')

it('should throw an error if no authorization header is present', () => {
  const req = {
    get: () => null
  }
  // auth(req, {}, () => {});
})