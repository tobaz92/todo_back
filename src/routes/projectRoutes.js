const express = require('express')
const router = express.Router()

const ProjectController = require('../controllers/projectController')

const authMiddleware = require('../middleware/authMiddleware')
const getProjectById = require('../middleware/project/getProjectById')
const checkProjectPermission = require('../middleware/project/checkProjectPermission')
const projectsFiltredByUser = require('../middleware/project/projectsFiltredByUser')

const isEditor = require('../middleware/isEditor')

router.get('/dev', ProjectController.getAllProjects)

// router.get('/', authMiddleware, isEditor, projectsFiltredByUser, (req, res) =>
//   ProjectController.getUserProjects(req, res)
// )

// router.get(
//   '/:id',
//   authMiddleware,
//   isEditor,
//   getProjectById,
//   checkProjectPermission,
//   ProjectController.getUserProjects
// )

router.post('/', authMiddleware, isEditor, ProjectController.createProject)

// router.put(
//   '/:id',
//   authMiddleware,
//   isEditor,
//   getProjectById,
//   checkProjectPermission,
//   ProjectController.updateProject
// )

router.delete(
  '/:id',
  authMiddleware,
  isEditor,
  getProjectById,
  checkProjectPermission,
  ProjectController.deleteProject
)

module.exports = router
