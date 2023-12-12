const ProjectModel = require('../models/project')

const ProjectController = {
  getAll: async (req, res) => {
    try {
      const projects = await ProjectModel.find()
      res.json(projects)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  get: async (req, res) => {
    try {
      const todos = req.todos
      const project = req.project

      res.json({
        project: project,
        todos: todos,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  create: async (req, res) => {
    try {
      const userId = req.userId
      let { title, order } = req.body

      const reorder = order === undefined ? false : true

      if (order === undefined) {
        const projects = await ProjectModel.find()
        order =
          projects.length > 0 ? projects[projects.length - 1].order + 1 : 0
      }
      const project = new ProjectModel({ title, order, userId })
      const savedProject = await project.save()
      res.json(savedProject)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Delete a project in the database
  delete: async (req, res) => {
    try {
      const projectId = req.params.id

      const deletedProject = await ProjectModel.findByIdAndDelete(projectId)

      res.json({ message: 'Project deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = ProjectController
