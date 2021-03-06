const router = require('express').Router()
const User = require('../db/models/user')
const {isAdmin} = require('./gatekeeper')
const {isUser} = require('./gatekeeper')
// Do we need an all users request?? Is this specifically for Admin use only??

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// Single User
router.get('/:id', isAdmin, async (req, res, next) => {
  try {
    //check to see if id is an actual number
    const singleUser = await User.findByPk(req.params.id)
    res.send(singleUser)
  } catch (err) {
    next(err)
  }
})

// Create User
router.post('/', isAdmin, async (req, res, next) => {
  try {
    //destructure req.body before sending into create only send in necessary info
    const newUser = await User.create(req.body)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
})
// Update User
router.put('/:id', isUser, async (req, res, next) => {
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
router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id)
    await user.destroy()
    res.send(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
