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
  const { mongoConnect } = require('./util/mongodb');
  await mongoConnect();

  const User = require('./models/user_vanilla');

  try {
    const adminUser =  await User.fetchByUsername('admin');
    console.log('Admin: ', adminUser);
    if ( ! adminUser ) {
      let newAdmin = new User('admin', 'admin@xrw.io');
      console.log('Create admin IF NOT EXIST: ', await newAdmin.save());
    }

  } catch ( err ) {
    console.log(err)
  }
}

// doMongoBoot();

const doMoogooseBoot = async _ => {
  const mongoose = require('mongoose');
  const User = require('./models/user_mongoose')
  try {
    await mongoose.connect('mongodb://root:123456@localhost:27017/product?authSource=admin')

    const admin = await User.findOne({username: 'admin'});
    console.log('admin: ', admin);
    if ( ! admin ) {
      const admin = new User({
        username: 'admin',
        email: 'admin@xrw.io',
        cart: {
          items: []
        }
      })
      const newAdmin = await admin.save();
      console.log('new admin: ', newAdmin);
    }
  } catch ( err ) {
    console.log(err)
  } 
}

doMoogooseBoot();

// doMysqlBoot();

