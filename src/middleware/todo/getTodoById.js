const TodoModel = require('../../models/todo')

// Middleware to retrieve a todo by ID
const getTodoById = async (req, res, next) => {
  try {
    const todoId = req.params.id

    // Check if the todo ID is provided
    if (!todoId) {
      return res.status(400).json({ error: 'Todo ID is missing' })
    }

    // Retrieve the todo from the database based on the ID
    const todo = await TodoModel.findById(todoId)

    // Check if the todo exists
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' })
    }

    req.todo = todo

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getTodoById
