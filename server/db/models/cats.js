const Sequelize = require('sequelize')
const db = require('../db')

const Cat = db.define('cat', {
  breed: {
    type: Sequelize.STRING
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  adoptionStatus: {
    type: Sequelize.STRING,
    allowNull: false
  },
  adoptionFee: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  ownerId: {
    type: Sequelize.INTEGER
  }
})

module.exports = Cat
