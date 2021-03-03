const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'other'
  },
  price: {
    type: Sequelize.DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Product