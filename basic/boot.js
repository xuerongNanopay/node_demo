const doMysqlBoot = async _ => {
  const sequelize = require('./util/mysql');
  require('./model');
  const User = require('./model/user_mysql');

  await sequelize
  // .sync({ force: true })
  .sync({ alter: true })
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
    return user.createCart();
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
}

const doMongoBoot = async _ => {
  const mongClient = require('./util/mongodb');
  mongClient(client => {
    console.log(client);
  })
}

doMongoBoot()

// doMysqlBoot();

