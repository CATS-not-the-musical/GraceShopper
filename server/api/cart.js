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
router.delete('/', async (req, res, next) => {
  console.log('express delete route req', req.body)
  try {
    // if (!(typeof parseInt(req.params.catid) === 'number')) {
    //   throw new Error('invalid request needs to be number to delete')
    // }
    //find the user's cart marked by fulfilledstatus:false
    const userOrder = await Order.findAll({
      where: {userId: req.user.id, fulfilledStatus: false}
    })
    const userOrderId = userOrder[0].id
    const cat = await ProductOrder.findOne({
      where: {catId: req.body.catid, orderId: userOrderId}
    })
    await cat.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

router.put('/', async (req, res, next) => {
  //find the user's cart marked by fulfilledstatus:false
  console.log(
    'this is the express put route req.body and req.user',
    req.body,
    req.user
  )
  try {
    const userOrder = await Order.findAll({
      where: {userId: req.user.id, fulfilledStatus: false}
    })
    const userOrderId = userOrder[0].id
    const lineItemId = req.body.id //change based on how req is passed
    const newQuantity = req.body.quantity // this change based on how req is passed
    const lineItemToUpdate = await ProductOrder.findOne({
      where: {orderId: userOrderId, catId: lineItemId}
    })
    lineItemToUpdate.quantity = newQuantity
    await lineItemToUpdate.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
