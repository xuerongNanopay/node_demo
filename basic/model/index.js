require('./order_mysql');
const Product = require('./product_mysql');
const User = require('./user_mysql');
const Cart = require('./cart_mysql');
const CartItem = require('./cart_item_mysql');

// User 1:* Product
Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);

// User 1:1 Product
User.hasOne(Cart);
Cart.belongsTo(User);

// Cart *:* Product
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});