const router = require('express').Router()


router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Single User
router.get('/:id', async (req, res, next) => {
  try {
    const singleUser = await User.findByPk(req.params.id)
    res.send(singleUser)
  } catch (err) {
    next(err)
  }
})
// Create User
router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})
// Update User
router.put('/:id', async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id
      },
      returning: true
    })
    res.send(updatedUser)
  } catch (err) {
    next(err)
  }
})
// Remove User
router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.send(student)
  } catch (err) {
    next(err)
  }
})

module.exports = router
