const db = require('./db')

const Cat = require('./models/cats')
const User = require('./models/user')

// This is a great place to establish associations between your models
// (https://sequelize-guides.netlify.com/association-types/).
// Example:

module.exports = {
  // Include your models in this exports object as well!
  db,
  Cat,
  User
}

