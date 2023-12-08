const checkProjectPermission = async (req, res, next) => {
  try {
    const userId = req.userId
    const projectId = req.project.userId

    if (req.user && req.user.role !== 'admin') {
      if (userId !== projectId) {
        return res.status(403).json({ error: 'Permission denied' })
      }
    }

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = checkProjectPermission
