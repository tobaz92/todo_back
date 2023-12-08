// Middleware check if the user is the owner of the todo
const checkTodoPermission = async (req, res, next) => {
  try {
    const userId = req.userId
    const todoId = req.todo.userId

    // if admin pass
    if (req.role === 'admin') {
      next()
    }

    if (userId !== todoId) {
      return res.status(403).json({ error: 'Permission denied' })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = checkTodoPermission
