const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config')
const ErrorHandler = require('../constants/errorMessages/errorHandler')

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
        return res.status(403).json({
          error: ErrorHandler.getErrorMessage(
            'general',
            'PermissionsError',
            user.language
          ),
        })
      }

      if (!['admin', 'editor'].includes(finalRole)) {
        return res.status(400).json({
          error: ErrorHandler.getErrorMessage('users', 'invalidRole'),
        })
      }

      const user = new UserModel({ username, email, password, role: finalRole })
      const savedUser = await user.save()

      res.json({
        message: ErrorHandler.getErrorMessage(
          'users',
          'userCreated',
          user.language
        ),
        userId: savedUser.id,
      })
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
        message: ErrorHandler.getErrorMessage('users', 'userDeleted'),
      })
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
        return res
          .status(404)
          .json({
            error: ErrorHandler.getErrorMessage('users', 'userNotFound'),
          })
      }

      user.username = username ?? user.username
      user.email = email ?? user.email
      user.password = password ?? user.password
      user.role = role ?? user.role
      user.isActive = isActive ?? user.isActive
      user.isBanned = isBanned ?? user.isBanned
      //   user.secretKey = secretKey ?? user.secretKey

      // Save changes
      const updatedUser = await user.save()

      res.json({
        message: ErrorHandler.getErrorMessage(
          'users',
          'userUpdated',
          user.language
        ),
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
        return res
          .status(401)
          .json({ error: ErrorHandler.getErrorMessage('users', 'userUpdated') })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (!passwordMatch) {
        return res
          .status(401)
          .json({
            error: ErrorHandler.getErrorMessage('users', 'invalidPassword'),
          })
      }

      const { isActive, isBanned } = user
      if (isBanned) {
        return res
          .status(403)
          .json({
            error: ErrorHandler.getErrorMessage(
              'users',
              'userBannedOrNotActive'
            ),
          })
      }
      if (!isActive) {
        return res
          .status(401)
          .json({
            error: ErrorHandler.getErrorMessage(
              'users',
              'userBannedOrNotActive'
            ),
          })
      }

      //   user.isLogged = true

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
    console.log('ok')
    consoler.log(req)

    const user = req.user

    // user.isLogged = false
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
}

module.exports = UserController
