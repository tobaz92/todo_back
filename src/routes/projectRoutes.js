const express = require('express')
const router = express.Router()

const ProjectController = require('../controllers/projectController')

const authMiddleware = require('../middleware/authMiddleware')
const getProjectById = require('../middleware/project/getProjectById')
const checkProjectPermission = require('../middleware/project/checkProjectPermission')
const projectsFiltredByUser = require('../middleware/project/projectsFiltredByUser')

const isEditor = require('../middleware/isEditor')
const getAllTodosInPRoject = require('../middleware/project/getAllTodosInPRoject')

router.get('/', ProjectController.getAll)

// router.get('/', authMiddleware, isEditor, projectsFiltredByUser, (req, res) =>
//   ProjectController.getUserProjects(req, res)
// )

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

// router.put(
//   '/:id',
//   authMiddleware,
//   isEditor,
//   getProjectById,
//   checkProjectPermission,
//   ProjectController.updateProject
// )

// TODO : have a probleme with this route
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
