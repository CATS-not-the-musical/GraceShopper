const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  adoptionFee: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
})

module.exports = ProductOrder
