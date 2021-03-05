module.exports = function isAdmin(req, res, next) {
  console.log('isAdmin auth ran---user:', req.user)
  if (req.user) {
    if (req.user.role === 'admin') {
      return next()
    }
  }
  console.log('not enough permissions-show error')
  res.send('please go back. Only administrators beyond this point')
}
