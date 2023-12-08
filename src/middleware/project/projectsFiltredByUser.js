const ProjectModel = require('../../models/project')

// Middleware to retrieve a project by ID
const projectsFiltredByUser = async (req, res, next) => {
  try {
    const userId = req.userId

    // Check if the project ID is provided
    if (!userId) {
      return res.status(400).json({ error: 'user ID is missing' })
    }

    // Find all project with userId
    const project = await ProjectModel.find({ userId: userId })

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

module.exports = projectsFiltredByUser
