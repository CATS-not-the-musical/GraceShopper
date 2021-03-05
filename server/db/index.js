const db = require('./db')

const Cat = require('./models/cat')
const User = require('./models/user')
const Order = require('./models/order')
const ProductOrder = require('./models/productOrder')

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/)
// Example:
Order.belongsTo(User)
User.hasMany(Order)

Order.belongsToMany(Cat, {through: ProductOrder})
Cat.belongsToMany(Order, {through: ProductOrder})

module.exports = {
  // Include your models in this exports object as well!
  db,
  Cat,
  User,
  Order,
  ProductOrder
}
