//Initial Application.

const sequelize = require('./util/mysql');
require('./model');
sequelize
  .sync()
  .then(result => {
    //console.log(result);
  })
  .catch(err => {
    console.log(err);
    process.exit(1);
  });

