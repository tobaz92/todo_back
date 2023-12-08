require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')
const todoRoutes = require('./routes/todoRoutes')
const log2faRoutes = require('./routes/log2faRoutes')

const app = express()
const PORT = process.env.API_PORT

app.use(bodyParser.json())

mongoose.connect(
  `mongodb://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`
)

const db = mongoose.connection

db.on('error', (error) => {
  console.error('Error connecting to the database:', error)
  throw new Error('Unable to connect to the database')
})
db.once('open', () => {
  console.log('Successfully connected to the database')
})

app.use('/users', userRoutes)

app.use('/todos', todoRoutes)

app.use('/2fa', log2faRoutes) // In progress

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
