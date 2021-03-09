const router = require('express').Router()
const {Order} = require('../db')
const {ProductOrder} = require('../db')
const {Cat} = require('../db')

// API/Cart (/All Carts)
// /api/cart/:userID
// /api/cart/4
// /api/cart/users/4
// /api/users/4/cart --> cart of 4th user
router.get('/', async (req, res, next) => {
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
// /api/cart/orderId/users/4
router.delete('/', async (req, res, next) => {
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

// /api/cart/orderId/checkout
router.put('/checkout', async (req, res, next) => {
  try {
    const userOrder = await Order.findOne({
      where: {userId: req.user.id, fulfilledStatus: false}
    })
    userOrder.fulfilledStatus = true
    await userOrder.save()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

// /cart/user/4/
// where do we put specific resources?
router.post('/', async (req, res, next) => {
  try {
    const userOrder = await Order.findOrCreate({
      where: {userId: req.user.id, fulfilledStatus: false}
    })
    const userOrderId = userOrder[0].id
    const newCat = ProductOrder.build({
      orderId: userOrderId,
      catId: req.body.catId,
      quantity: 1
    })
    await newCat.save()
    const output = newCat.toJSON()
    res.json(output)
  } catch (error) {
    next(error)
  }
})

module.exports = router
