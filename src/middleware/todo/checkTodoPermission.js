// Middleware check if the user is the owner of the todo
const checkTodoPermission = async (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  }
  try {
    const userId = req.userId
    const todoId = req.todo.userId

    if (userId !== todoId) {
      return res.status(403).json({ error: 'Permission denied' })
    }

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = checkTodoPermission
