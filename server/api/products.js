const router = require('express').Router()
const Product = require('../db/models/product')

// All Products
router.get('/', async (req, res, next) => {
  try {
    const allProducts = await Product.findAll()
    res.json(allProducts)
  } catch (err) {
    next(err)
  }
})

// Single Product
router.get('/:id', async (req, res, next) => {
  try {
    const singleProduct = await Product.findByPk(req.params.id)
    res.send(singleProduct)
  } catch (err) {
    next(err)
  }
})

// Create Product
router.post('/', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body)
    res.json(newProduct)
  } catch (err) {
    next(err)
  }
})

// Update Product
router.get('/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.send(updatedProduct)
  } catch (err) {
    next(err)
  }
})

// Delete Product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    await product.destroy()
    res.send(product)
  } catch (err) {
    next(err)
  }
})

module.exports = router
