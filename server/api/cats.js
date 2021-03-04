const router = require('express').Router()
const {Cat} = require('../db')
const isAdmin = require('./gatekeeper')

router.get('/', isAdmin, async (req, res, next) => {
  console.log('cat route')
  try {
    const allCats = await Cat.findAll()
    res.json(allCats)
  } catch (err) {
    next(err)
  }
})
router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    const singleCat = await Cat.findByPk(req.params.id)
    res.json(singleCat)
  } catch (err) {
    next(err)
  }
})
router.post('/', isAdmin, async (req, res, next) => {
  try {
    const newCat = await Cat.create(req.body)
    res.json(newCat)
  } catch (err) {
    next(err)
  }
})
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const removeCat = await Cat.findByPk(req.params.id)
    await removeCat.destroy()
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const updatedCat = await Cat.update(req.body, {
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

module.exports = router
