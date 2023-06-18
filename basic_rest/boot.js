const doMoogooseBoot = async _ => {
  const mongoose = require('mongoose');
  try {
    await mongoose.connect('mongodb://root:123456@localhost:27017/rest_demo?authSource=admin')
  } catch ( err ) {
    console.log(err);
    throw new Error(err);
  } 
}

module.exports = async _ => {
  await doMoogooseBoot();
}