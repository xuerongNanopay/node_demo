//Initial Application.

const sequelize = require('./util/mysql');
require('./model');
const User = require('./model/user_mysql');

const doBoot = async _ => {
  await sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    //console.log(result);
    return User.findByPk(1);
  })
  .then(user => {
    if ( !user ) {
      return User.create({name: 'XRW', email: 'admin@xrw.io'})
    }
    return user;
  })
  .then(user => {
    console.log(user)
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
}

doBoot();

