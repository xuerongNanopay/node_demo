const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', require: true },
      quantity: { type: Number, require: true }
    }
  ],
  user: {
    username: {
      type: String,
      require: true
    },
    userId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    }
  },
})

module.exports = mongoose.model('Order', orderSchema);