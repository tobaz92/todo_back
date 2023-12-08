const ProjectModel = require('../models/project')

const ProjectController = {
  getAllProjects: async (req, res) => {
    try {
      const projects = await ProjectModel.find()
      res.json(projects)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  //   getUserTodos: async (req, res) => {
  //     try {
  //       res.json(req.project)
  //     } catch (error) {
  //       res.status(500).json({ error: error.message })
  //     }
  //   },

  createProject: async (req, res) => {
    try {
      const userId = req.userId
      const { title, order } = req.body

      const projects = await ProjectModel.find()

      let newOrder
      if (!order) {
        const lastOrder = projects[projects.length - 1]?.order
        newOrder = lastOrder === undefined ? 0 : lastOrder + 1
      } else {
        newOrder = order
      }
      console.log('order', order)
      console.log('newOrder', newOrder)

      const project = new ProjectModel({ title, order: newOrder, userId })

      const savedProject = await project.save()
      res.json(savedProject)

      // TODO: update order of all projects

      //   // reorder all projects
      //   const projectsOrder = await ProjectModel.find()

      //   // projectOrder order by key order
      //   projectsOrder.sort((a, b) => a.order - b.order)

      //   projectsOrder.forEach(async (project, index) => {
      //     project.order = index
      //     await project.save()
      //   })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  //   // Update a project in the database
  //   updateProject: async (req, res) => {
  //     try {
  //       const project = req.project

  //       const { title, description, isCompleted, date } = req.body

  //       project.title = title ?? project.title
  //       project.description = description ?? project.description
  //       project.isCompleted = isCompleted ?? project.isCompleted

  //       const updatedProject = await project.save()
  //       res.json({ message: 'Update Project successfully' })
  //     } catch (error) {
  //       res.status(500).json({ error: error.message })
  //     }
  //   },

  //   // Delete a project in the database
  deleteProject: async (req, res) => {
    try {
      const projectId = req.params.id

      const project = await ProjectModel.findByIdAndDelete(projectId)

      res.json({ message: 'Project deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = ProjectController
