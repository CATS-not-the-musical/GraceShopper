function isAdmin(req, res, next) {
  console.log('isAdmin auth ran---user:', req.user)
  if (req.user) {
    if (req.user.role === 'admin') {
      return next()
    }
  }
  console.log('not enough permissions-show error')
  res.send('please go back. Only administrators beyond this point')
}

function isUser(req, res, next) {
  if (req.user) {
    return next()
  }
  res.send('Please login to use this feature')
}

module.exports = {isAdmin, isUser}
