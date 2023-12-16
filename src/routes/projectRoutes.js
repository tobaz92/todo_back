const express = require('express')
const router = express.Router()

const ProjectController = require('../controllers/projectController')

const authMiddleware = require('../middleware/user/authMiddleware')
const getProjectById = require('../middleware/project/getProjectById')
const checkProjectPermission = require('../middleware/project/checkProjectPermission')
const projectsFiltredByUser = require('../middleware/project/projectsFiltredByUser')

const isEditor = require('../middleware/user/isEditor')
const getAllTodosInPRoject = require('../middleware/project/getAllTodosInPRoject')

router.get('/dev', ProjectController.getAll)

// router.get(
//   '/',
//   authMiddleware,
//   isEditor,
//   projectsFiltredByUser,
//   ProjectController.getUserProjects
// )
router.get(
  '/',
  authMiddleware,
  isEditor,
  projectsFiltredByUser,
  ProjectController.getAllUser
)

// PROJECT GET ONE : title, order, isArchive, isDeleted
router.get(
  '/:id',
  authMiddleware,
  isEditor,
  getProjectById,
  checkProjectPermission,
  getAllTodosInPRoject,
  ProjectController.get
)

router.post('/', authMiddleware, isEditor, ProjectController.create)

// PROJECT UPDATE : title, order, isArchive, isDeleted
router.put(
  '/:id',
  authMiddleware,
  isEditor,
  getProjectById,
  checkProjectPermission,
  ProjectController.update
)

// DELETE PROJECT
router.delete(
  '/:id',
  authMiddleware,
  isEditor,
  getProjectById,
  checkProjectPermission,
  ProjectController.delete
)

router.delete('/dev/:id', ProjectController.delete)

module.exports = router
