const express = require('express')
const router = express.Router()

const ErrorHandler = require('./constants/errorMessages/errorHandler')

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const log2faRoutes = require('./routes/log2faRoutes')
const projectRoutes = require('./routes/projectRoutes')

const UserController = require('./controllers/userController')

const emailService = require('./emailService')

router.post('/send-email', async (req, res) => {
  try {
    const { to, activationToken } = req.body

    // Utilisez le service d'e-mail pour envoyer l'e-mail d'activation
    await emailService.sendActivationEmail(to, activationToken)

    res.status(200).json({ message: 'E-mail envoyé avec succès' })
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail :", error)
    res.status(500).json({ error: "Erreur lors de l'envoi de l'e-mail" })
  }
})

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
