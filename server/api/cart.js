const router = require('express').Router()
const {Order} = require('../db')
const {ProductOrder} = require('../db')
const {Cat} = require('../db')

router.get('/', async (req, res, next) => {
  console.log('we are here')
  try {
    if (req.user) {
      const {data} = await Order.find({
        where: {
          userId: req.params.id
        },
        include: [
          {
            model: Cat,
            through: {ProductOrder: []}
          }
        ]
      })
      res.json(data)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:catid', async (req, res, next) => {
  try {
    if (!(typeof req.params.id === 'number')) {
      throw new Error('invalid request needs to be number to delete')
    }
    const cat = await ProductOrder.findByPk(req.params.catid)
    await cat.destroy()
    next()
  } catch (err) {
    next(err)
  }
})

module.exports = router
