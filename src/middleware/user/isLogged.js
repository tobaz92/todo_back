const User = require('../../models/user')
const ErrorHandler = require('../../constants/errorMessages/errorHandler')

const isLogged = async (req, res, next) => {
  if (req.user && req.user.isLogged === true) {
    next()
  } else {
    res
      .status(401)
      .json({ error: ErrorHandler.getErrorMessage('users', 'invalidToken') })
  }
}

module.exports = isLogged
