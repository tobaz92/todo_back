const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')

const UserController = {
  // Get all users (for dev)
  getAll: async (req, res) => {
    try {
      const users = await UserModel.find()
      res.json(users)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Get a user
  get: async (req, res) => {
    res.status(500).json({
      userId: req.user.id,
      username: req.user.username,
      email: req.user.email,
    })
  },

  // Create a new user with a specified role
  create: async (req, res) => {
    try {
      const { username, email, password, role } = req.body

      const finalRole = ['admin', 'editor'].includes(role) ? role : 'editor'

      if (finalRole === 'admin' && req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Permission refusée' })
      }

      if (!['admin', 'editor'].includes(finalRole)) {
        return res.status(400).json({ error: 'Role invalide' })
      }

      const user = new UserModel({ username, email, password, role: finalRole })
      const savedUser = await user.save()

      res.json({ message: 'Created successfully', userId: savedUser.id })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Delete a user
  delete: async (req, res) => {
    try {
      const userId = req.params.id

      // Check if the user exists
      const user = await UserModel.findById(userId)

      if (!user) {
        return res.status(404).json({ error: 'User not found' })
      }

      // Delete the user
      await UserModel.findByIdAndDelete(userId)

      res.json({ message: 'User deleted successfully' })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Update a user
  update: async (req, res) => {
    try {
      const userId = req.params.id
      const { username, email, password, role, isActive, isBanned } = req.body

      // Check if user exists
      const user = await UserModel.findById(userId)

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' })
      }

      user.username = username ?? user.username
      user.email = email ?? user.email
      user.password = password ?? user.password
      user.role = role ?? user.role
      user.isActive = isActive ?? user.isActive
      user.isBanned = isBanned ?? user.isBanned
      user.secretKey = secretKey ?? user.secretKey

      // Save changes
      const updatedUser = await user.save()

      res.json({
        message: 'Utilisateur mis à jour avec succès',
        username: updatedUser.username,
        email: updatedUser.email,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Authenticate a user
  login: async (req, res) => {
    try {
      const { email, password } = req.body

      const user = await UserModel.findOne({ email })

      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Mot de passe incorrect' })
      }

      const { isActive, isBanned } = user
      if (isBanned) {
        return res.status(403).json({ error: 'You are banned. Access denied.' })
      }
      if (!isActive) {
        return res.status(401).json({ error: 'Your account is not activated.' })
      }

      const token = jwt.sign({ userId: user._id }, config.secretKey, {
        expiresIn: 3600, // Expires in 1 hour
      })

      res.json({ token })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = UserController
