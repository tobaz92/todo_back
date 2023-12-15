require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const log2faRoutes = require('./routes/log2faRoutes')

const projectRoutes = require('./routes/projectRoutes')
const UserController = require('./controllers/userController')

const ErrorHandler = require('./constants/errorMessages/errorHandler')

const app = express()

app.use(bodyParser.json())

mongoose.connect(
  `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
)

const db = mongoose.connection

db.on('error', (error) => {
  console.error(
    ErrorHandler.getErrorMessage('general', 'databaseConnectionError'),
    error
  )
  throw new Error(
    ErrorHandler.getErrorMessage('general', 'databaseConnectionError')
  )
})
db.once('open', () => {
  console.log(
    ErrorHandler.getErrorMessage('general', 'databaseConnectionSuccesfully')
  )
})

app.get('/', (req, res) => {
  res.status(200).send(ErrorHandler.getErrorMessage('general', 'helloWorld'))
})

app.use('/users', userRoutes)

app.use('/todos', todoRoutes)

app.use('/projects', projectRoutes)

// USER AUTHENTICATION

app.use('/login', UserController.login)

app.use('/2fa', log2faRoutes) // In progress

app.use('/register', UserController.create)

// app.use('/forgot-password', UserController.forgotPassword)

// app.use('/reset-password', UserController.resetPassword)

module.exports = { app }
