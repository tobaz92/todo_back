const User = require('../models/user')
const ErrorHandler = require('../constants/errorMessages/errorHandler')

const isAdmin = async (req, res, next) => {
  const userId = req.userId

  try {
    const user = await User.findById(userId)
    if (!user || user.role !== 'admin') {
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

module.exports = isAdmin
