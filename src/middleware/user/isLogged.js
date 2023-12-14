const User = require('../../models/user')

const isLogged = async (req, res, next) => {
  if (req.user && req.user.isLogged === true) {
    next()
  } else {
    res.status(401).json({ error: 'Permission denied' })
  }
}

module.exports = isLogged
