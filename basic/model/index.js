require('./order_mysql');
const Product = require('./product_mysql');
const User = require('./user_mysql');
const Cart = require('./cart_mysql');
const CartItem = require('./cart_item_mysql');

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});

User.hasMany(Product);

User.hasOne(Cart);
Cart.belongsTo(User);

Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});