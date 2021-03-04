const router = require('express').Router()
const Cats = require('../db/models/cats')

// All Cats
router.get('/', async (req, res, next) => {
  try {
    const allCats = await Cats.findAll()
    res.json(allCats)
  } catch (err) {
    next(err)
  }
})

// Single Product
router.get('/:id', async (req, res, next) => {
  try {
    const singleCat = await Cats.findByPk(req.params.id)
    res.send(singleCat)
  } catch (err) {
    next(err)
  }
})

// Create Product
router.post('/', async (req, res, next) => {
  try {
    const newCat = await Cats.create(req.body)
    res.json(newCat)
  } catch (err) {
    next(err)
  }
})

// Update Product
router.get('/:id', async (req, res, next) => {
  try {
    const updatedCat = await Cats.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.send(updatedCat)
  } catch (err) {
    next(err)
  }
})

// Delete Product
router.delete('/:id', async (req, res, next) => {
  try {
    const cat = await Cats.findByPk(req.params.id)
    await cat.destroy()
    res.send(cat)
  } catch (err) {
    next(err)
  }
})

module.exports = router
