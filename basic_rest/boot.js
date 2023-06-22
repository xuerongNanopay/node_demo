const doMoogooseBoot = async _ => {
  const mongoose = require('mongoose');
  try {
    await mongoose.connect(process.env.MONGO_URL)
  } catch ( err ) {
    console.log(err);
    throw new Error(err);
  } 
}

module.exports = async _ => {
  await doMoogooseBoot();
}