const TodoModel = require('../../models/todo')

const getAllTodosInPRoject = async (req, res, next) => {
  try {
    const projectId = req.params.id
    const todos = await TodoModel.find({ projectId: projectId })
    req.todos = todos

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getAllTodosInPRoject
