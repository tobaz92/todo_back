const ErrorHandler = require('../constants/errorMessages/errorHandler')

const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const emailService = require('../emailService')

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
  register: async (req, res) => {
    try {
      const { username, email, password, role } = req.body

      const finalRole = ['admin', 'editor'].includes(role) ? role : 'editor'

      if (finalRole === 'admin' && req.user.role !== 'admin') {
        return res.status(403).json({
          error: ErrorHandler.getErrorMessage(
            'general',
            'PermissionsError',
            req.user.language
          ),
        })
      }

      if (!['admin', 'editor'].includes(finalRole)) {
        return res.status(400).json({
          error: ErrorHandler.getErrorMessage('users', 'invalidRole'),
        })
      }

      const user = new UserModel({ username, email, password, role: finalRole })

      const activationToken = jwt.sign({ userId: user._id }, config.secretKey, {
        // Expires in 1 day
        expiresIn: 86400,
      })

      user.activationToken = activationToken

      try {
        const savedUser = await user.save()

        // Envoyer l'e-mail après avoir sauvegardé l'utilisateur avec succès
        await emailService.sendActivationEmail(email, username, activationToken)

        res.status(200).json({ message: 'E-mail envoyé avec succès' })
      } catch (error) {
        console.error("Erreur lors de l'envoi de l'e-mail :", error)
        res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" })
      }
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
        return res.status(404).json({
          error: ErrorHandler.getErrorMessage('users', 'userNotFound'),
        })
      }

      // Delete the user
      await UserModel.findByIdAndDelete(userId)

      res.json({
        message: ErrorHandler.getErrorMessage(
          'users',
          'userDeleted',
          user.language
        ),
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Update a user
  update: async (req, res) => {
    try {
      const userId = req.params.id
      const {
        username,
        email,
        password,
        role,
        isActive,
        isBanned,
        language,
        activationToken,
      } = req.body

      // Check if user exists
      const user = await UserModel.findById(userId)

      if (!user) {
        return res.status(404).json({
          error: ErrorHandler.getErrorMessage('users', 'userNotFound'),
        })
      }

      user.username = username ?? user.username
      user.email = email ?? user.email
      user.password = password ?? user.password
      user.role = role ?? user.role
      user.isActive = isActive ?? user.isActive
      user.isBanned = isBanned ?? user.isBanned
      user.language = language ?? user.language
      user.activationToken = activationToken ?? user.activationToken

      //   user.secretKey = secretKey ?? user.secretKey

      // Save changes
      const updatedUser = await user.save()
      res.json({
        message: ErrorHandler.getErrorMessage(
          'users',
          'userUpdated',
          user.language
        ),
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
        return res
          .status(401)
          .json({ error: ErrorHandler.getErrorMessage('users', 'userUpdated') })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res.status(401).json({
          error: ErrorHandler.getErrorMessage('users', 'invalidPassword'),
        })
      }

      const { isActive, isBanned } = user
      if (isBanned) {
        return res.status(403).json({
          error: ErrorHandler.getErrorMessage('users', 'userBannedOrNotActive'),
        })
      }
      if (!isActive) {
        return res.status(401).json({
          error: ErrorHandler.getErrorMessage('users', 'userBannedOrNotActive'),
        })
      }

      // Save changes
      const loginUser = await user.save()

      const token = jwt.sign({ userId: user._id }, config.secretKey, {
        expiresIn: 3600, // Expires in 1 hour
      })

      res.json({ token, userId: user._id })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },

  // Logout a user
  logout: async (req, res) => {
    const user = req.user

    // Save changes
    // const logoutUser = await user.save()

    res.json({
      message: ErrorHandler.getErrorMessage(
        'users',
        'userBannedOrNotActive',
        user.language
      ),
    })
  },

  activation: async (req, res) => {
    try {
      const activationToken = req.params.token

      const user = await UserModel.findOne({ activationToken })

      if (!user) {
        return res.status(404).json({
          error: ErrorHandler.getErrorMessage(
            'users',
            'invalidActivationToken'
          ),
        })
      }

      user.isActive = true
      user.activationToken = null

      // Save changes
      const activatedUser = await user.save()

      const token = jwt.sign({ userId: user._id }, config.secretKey, {
        expiresIn: 3600, // Expires in 1 hour
      })

      res.json({
        message: ErrorHandler.getErrorMessage(
          'users',
          'userActivated',
          user.language
        ),
        token,
        userId: user._id,
      })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  },
}

module.exports = UserController
