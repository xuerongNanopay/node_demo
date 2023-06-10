require('./order_mysql');
const Product = require('./product_mysql');
const User = require('./user_mysql');

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});

User.hasMany(Product);