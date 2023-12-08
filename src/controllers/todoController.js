const TodoModel = require('../models/todo')

const TodoController = {
  // Get all todos from the database For dev
  getAllTodos: async (req, res) => {
    try {
      const todos = await TodoModel.find()
      res.json(todos)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  getUserTodos: async (req, res) => {
    try {
      res.json(req.todo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Create a new todo in the database
  createTodo: async (req, res) => {
    try {
      const userId = req.userId
      const { title, description } = req.body
      const todo = new TodoModel({ title, description, userId })
      const savedTodo = await todo.save()
      res.json(savedTodo)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Update a todo in the database
  updateTodo: async (req, res) => {
    try {
      const todo = req.todo

      const { title, description, isCompleted, date } = req.body

      todo.title = title ?? todo.title
      todo.description = description ?? todo.description
      todo.isCompleted = isCompleted ?? todo.isCompleted
      todo.date = date ?? todo.date

      const updatedTodo = await todo.save()
      res.json({ message: 'Update Todo successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Delete a todo in the database
  deleteTodo: async (req, res) => {
    try {
      const todoId = req.params.id

      // Delete the todo
      await TodoModel.findByIdAndDelete(todoId)

      res.json({ message: 'Todo deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

// Export TodoController for use in other files
module.exports = TodoController
