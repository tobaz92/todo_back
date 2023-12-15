const { default: mongoose } = require('mongoose')
const User = require('../models/user')

const ErrorHandler = require('../constants/errorMessages/errorHandler')

const isSameUser = async (req, res, next) => {
  const userIdFromPath = req.params.id // L'ID dans le chemin
  const userIdFromAuth = req.userId // L'ID de l'utilisateur authentifié

  if (!mongoose.Types.ObjectId.isValid(userIdFromAuth)) {
    return res.status(400).json({
      error: ErrorHandler.getErrorMessage('user', 'invalidCredentials'),
    })
  }

  try {
    const user = await User.findById(userIdFromAuth)

    if (!user) {
      return res.status(404).json({
        error: ErrorHandler.getErrorMessage('user', 'invalidUsername'),
      })
    }

    const userRole = user.role
    if (userRole === 'admin') {
      return next()
    }

    if (!user.isActive || user.isBanned) {
      return res.status(403).json({
        error: ErrorHandler.getErrorMessage(
          'users',
          'userBannedOrNotActive',
          user.language
        ),
      })
    }

    if (userIdFromPath !== userIdFromAuth) {
      return res.status(403).json({
        error: ErrorHandler.getErrorMessage(
          'user',
          'userNotFound',
          user.language
        ),
      })
    }

    const { role, isActive, isBanned } = req.body

    if (isActive !== undefined && isBanned !== undefined) {
      return res.status(403).json({
        error: ErrorHandler.getErrorMessage(
          'general',
          'PermissionsError',
          user.language
        ),
      })
    }

    if (role && role !== userRole) {
      return res.status(403).json({
        error: ErrorHandler.getErrorMessage(
          'general',
          'PermissionsError',
          user.language
        ),
      })
    }

    next()
  } catch (error) {
    res.status(500).json({
      error: ErrorHandler.getErrorMessage(
        'general',
        'internalServerError',
        user.language
      ),
    })
  }
}

module.exports = isSameUser
