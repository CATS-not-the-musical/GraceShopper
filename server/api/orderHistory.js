const router = require('express').Router()
const {Order} = require('../db')
const {Cat} = require('../db')

router.get('/users/:id/', async (req, res, next) => {
  try {
    const data = await Order.findAll({
      where: {
        userId: req.user.id,
        fulfilledStatus: true
      },
      include: [
        {
          model: Cat
        }
      ]
    })
    res.json(data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
