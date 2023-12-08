const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todoController')
const authMiddleware = require('../middleware/authMiddleware')

const getTodoById = require('../middleware/todo/getTodoById')
const checkTodoPermission = require('../middleware/todo/checkTodoPermission')
const todosFiltredByUser = require('../middleware/todo/todosFiltredByUser')

const isEditor = require('../middleware/isEditor')

// Get all todos for dev
router.get('/dev', (req, res) => TodoController.getAllTodos(req, res))

// Get user todos
router.get('/', authMiddleware, isEditor, todosFiltredByUser, (req, res) =>
  TodoController.getUserTodos(req, res)
)

// Get one todo
router.get(
  '/:id',
  authMiddleware,
  isEditor,
  getTodoById,
  checkTodoPermission,
  TodoController.getUserTodos
)

// Add a todo
router.post('/', authMiddleware, isEditor, TodoController.createTodo)

// Update a todo
router.put(
  '/:id',
  authMiddleware,
  isEditor,
  getTodoById,
  checkTodoPermission,
  TodoController.updateTodo
)

// Delete a todo
router.delete(
  '/:id',
  authMiddleware,
  isEditor,
  getTodoById,
  checkTodoPermission,
  TodoController.deleteTodo
)

module.exports = router
