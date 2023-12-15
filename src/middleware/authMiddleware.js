const jwt = require('jsonwebtoken')
const config = require('../config')
const UserModel = require('../models/user')
const ErrorHandler = require('../constants/errorMessages/errorHandler')

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')
  if (!token) {
    return res
      .status(401)
      .json({ error: ErrorHandler.getErrorMessage('users', 'invalidToken') })
  }

  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), config.secretKey)
    req.userId = decoded.userId

    // Check if user exists
    const foundUser = await UserModel.findById(req.userId)
    if (!foundUser) {
      return res
        .status(404)
        .json({ error: ErrorHandler.getErrorMessage('users', 'userNotFound') })
    }

    // remove password from user object
    // foundUser.password = undefined

    req.user = foundUser

    next()
  } catch (error) {
    res
      .status(401)
      .json({ error: ErrorHandler.getErrorMessage('users', 'invalidToken') })
  }
}

module.exports = authMiddleware
