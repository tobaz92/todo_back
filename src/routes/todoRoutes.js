const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/todoController')

const authMiddleware = require('../middleware/authMiddleware')
const getTodoById = require('../middleware/todo/getTodoById')
const checkTodoPermission = require('../middleware/todo/checkTodoPermission')
const todosFiltredByUser = require('../middleware/todo/todosFiltredByUser')

const isEditor = require('../middleware/isEditor')

// Get all todos for dev
router.get('/dev', TodoController.getAll)

// Get user todos
router.get(
  '/',
  authMiddleware,
  isEditor,
  todosFiltredByUser,
  TodoController.get
)

// Get one todo
router.get(
  '/:id',
  authMiddleware,
  isEditor,
  getTodoById,
  checkTodoPermission,
  TodoController.get
)

// Add a todo
router.post('/', authMiddleware, isEditor, TodoController.create)

// Update a todo
router.put(
  '/:id',
  authMiddleware,
  isEditor,
  getTodoById,
  checkTodoPermission,
  TodoController.update
)

// Delete a todo
router.delete(
  '/:id',
  authMiddleware,
  isEditor,
  getTodoById,
  checkTodoPermission,
  TodoController.delete
)

module.exports = router
