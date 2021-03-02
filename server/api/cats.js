const router = require('express').Router()
const {Cats} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const allCats = await Cats.findAll()
    res.json(cats)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const singleCat = await Cats.findByPk(req.params.id)
    res.json(cat)
  } catch (err) {
    next(err)
  }
})
router.post('/', async (req, res, next) => {
  try {
    const newCat = await Cat.create(req.body)
    res.json(newCat)
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', async (req, res, next) => {
  try {
    const removeCat = await Cats.findByPk(req.params.id)
    await removeCat.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const updatedCat = await Cats.update(req.body, {
      where: {
        id: req.params.id,
      },
      returning: true,
    })
    res.send(updatedCat)
  } catch (err) {
    next(err)
  }
})
