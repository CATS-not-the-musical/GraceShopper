const router = require('express').Router()
const {Cat} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {
    const allCats = await Cat.findAll()
    res.json(allCats)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const singleCat = await Cat.findByPk(req.params.id)
    res.json(singleCat)
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
    const removeCat = await Cat.findByPk(req.params.id)
    await removeCat.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
router.put('/:id', async (req, res, next) => {
  try {
    const updatedCat = await Cat.update(req.body, {
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

module.exports = router
