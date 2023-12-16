const User = require('../../models/user')
const ErrorHandler = require('../../constants/errorMessages/errorHandler')

const isEditor = async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      return next()
    }
    if (req.user.role !== 'editor') {
      return res.status(403).json({
        error: ErrorHandler.getErrorMessage(
          'general',
          'internalServerError',
          user.language
        ),
      })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = isEditor
