const TodoModel = require('../models/todo')
const ErrorHandler = require('../constants/errorMessages/errorHandler')

const TodoController = {
  // Get all todos from the database For dev
  getAll: async (req, res) => {
    try {
      const todos = await TodoModel.find()
      res.json(todos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  get: async (req, res) => {
    try {
      res.json(req.todo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Create a new todo in the database
  create: async (req, res) => {
    try {
      const userId = req.userId
      const { title, description, projectId } = req.body
      const todo = new TodoModel({ title, description, userId, projectId })
      const savedTodo = await todo.save()
      res.json(savedTodo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Update a todo in the database
  update: async (req, res) => {
    try {
      const todo = req.todo

      const { title, description, isCompleted, date } = req.body

      todo.title = title ?? todo.title
      todo.description = description ?? todo.description
      todo.isCompleted = isCompleted ?? todo.isCompleted

      const updatedTodo = await todo.save()
      res.json({
        message: ErrorHandler.getErrorMessage('todos', 'todoUpdated'),
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Delete a todo in the database
  delete: async (req, res) => {
    try {
      const todoId = req.params.id

      // Delete the todo
      const deletedTodo = await TodoModel.findByIdAndDelete(todoId)

      res.json({
        message: ErrorHandler.getErrorMessage('todos', 'todoDeleted'),
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

// Export TodoController for use in other files
module.exports = TodoController
