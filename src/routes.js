const express = require('express')
const router = express.Router()

const ErrorHandler = require('./constants/errorMessages/errorHandler')

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const log2faRoutes = require('./routes/log2faRoutes')
const projectRoutes = require('./routes/projectRoutes')

const UserController = require('./controllers/userController')

router.get('/', (req, res) => {
  res.status(200).send(ErrorHandler.getErrorMessage('general', 'helloWorld'))
})

router.use('/users', userRoutes)

router.use('/todos', todoRoutes)

router.use('/projects', projectRoutes)

// USER AUTHENTICATION

router.use('/login', UserController.login)

router.use('/2fa', log2faRoutes) // In progress

router.use('/register', UserController.create)

// app.use('/forgot-password', UserController.forgotPassword)

// app.use('/reset-password', UserController.resetPassword)

module.exports = router
