const TodoModel = require('../../models/todo')

// Middleware to retrieve a todo by ID
const todosFiltredByUser = async (req, res, next) => {
  try {
    const userId = req.userId

    // Check if the todo ID is provided
    if (!userId) {
      return res.status(400).json({ error: 'user ID is missing' })
    }

    // Find all todo with userId
    const todo = await TodoModel.find({ userId: userId })

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

module.exports = todosFiltredByUser
