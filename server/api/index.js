const router = require('express').Router()

router.use('/cats', require('./cats.js'))
router.use('/products', require('./products.js'))
router.use('/users', require('./users.js'))
router.use('/cart', require('./cart.js'))

router.use((req, res, next) => {
  const err = new Error('API route not found!')
  err.status = 404
  next(err)
})

module.exports = router
