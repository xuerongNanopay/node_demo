const {expect} = require('chai');
const auth = require('../middleware/is-auth');
const sinon = require('sinon');
const authController = require('../controllers/auth')
const User = require('../models/user');

describe('Auth Controller', () => {
  it('should throw an error if db fails', (done) => {
    sinon.stub(User, 'findOne');
    User.findOne.rejects("DB error");
    const req = {
      body: {
        email: 'test@test.com',
        passwod: 'aaa'
      }
    }
    authController.login(req, {}, e => {
      // console.log(e)
      expect(e.statusCode).to.equal(500);
      expect(e).to.be.an('error');
      done();
    })
    User.findOne.restore();
  })
})

it('should throw an error if no authorization header is present', () => {
  const req = {
    get: () => null
  }
  // auth(req, {}, () => {});
})