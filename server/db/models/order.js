const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('Order', {
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  fulfilledStatus: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
