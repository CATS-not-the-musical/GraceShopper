const router = require('express').Router()
const {Order} = require('../db')
const {ProductOrder} = require('../db')
const {Cat} = require('../db')

router.get('/', async (req, res, next) => {
  console.log('cart get route userid', req.user.id)
  try {
    // if (req.user) {
    const data = await Order.findAll({
      where: {
        userId: req.user.id,
        fulfilledStatus: false
      },
      include: [
        {
          model: Cat
        }
      ]
    })
    res.json(data)
    //}
  } catch (err) {
    next(err)
  }
})

//delete route for user cart
router.delete('/:catid', async (req, res, next) => {
  try {
    if (!(typeof parseInt(req.params.catid) === 'number')) {
      throw new Error('invalid request needs to be number to delete')
    }
    const userOrder = await Order.findAll({
      where: {userId: req.user.id, fulfilledStatus: false}
    })
    const userId = userOrder[0].id
    const cat = await ProductOrder.findOne({
      where: {catId: req.params.catid, orderId: userId}
    })
    await cat.destroy()
  } catch (err) {
    next(err)
  }
})

route.put('/:catid', async (req, res, next) => {})
module.exports = router
