require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const log2faRoutes = require('./routes/log2faRoutes')

const projectRoutes = require('./routes/projectRoutes')
const UserController = require('./controllers/userController')

const app = express()
const PORT = process.env.API_PORT || 3000

app.use(bodyParser.json())

mongoose.connect(
  `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
)

const db = mongoose.connection

// db.on('error', (error) => {
//   console.error('Error connecting to the database:', error)
//   throw new Error('Unable to connect to the database')
// })
// db.once('open', () => {
//   console.log('Successfully connected to the database')
// })

// app.use('/', (req, res) => {
//   res.status(200).send('API is running')
// })

app.use('/users', userRoutes)

app.use('/todos', todoRoutes)

app.use('/projects', projectRoutes)

app.use('/2fa', log2faRoutes) // In progress

app.use('/login', UserController.login)

app.post('/signin', UserController.create)

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`)
// })

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

// Exportez une fonction qui peut être utilisée pour fermer le serveur
const closeServer = (logMessage = true) => {
  server.close((err) => {
    if (err) {
      console.error('Error closing server:', err)
    } else if (logMessage) {
      console.log('Server closed successfully')
    }
  })
}

module.exports = {
  server,
  closeServer,
}
