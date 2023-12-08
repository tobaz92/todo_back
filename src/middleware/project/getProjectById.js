const ProjectModel = require('../../models/project')

// Middleware to retrieve a project by ID
const getProjectById = async (req, res, next) => {
  try {
    const projectId = req.params.id

    // Check if the project ID is provided
    if (!projectId) {
      return res.status(400).json({ error: 'Project ID is missing' })
    }

    // Retrieve the project from the database based on the ID
    const project = await ProjectModel.findById(projectId)

    // Check if the project exists
    if (!project) {
      return res.status(404).json({ error: 'Project not found' })
    }

    req.project = project

    next()
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = getProjectById
