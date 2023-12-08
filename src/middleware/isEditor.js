const User = require('../models/user')

const isEditor = async (req, res, next) => {
  const userId = req.userId

  try {
    const user = req.user

    if (user.role === 'admin') {
      return next()
    }

    if (user.role !== 'editor') {
      return res.status(403).json({ error: 'Permission refusée' })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = isEditor
