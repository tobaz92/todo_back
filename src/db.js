const mongoose = require('mongoose')
const ErrorHandler = require('./constants/errorMessages/errorHandler')

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
  //   console.log('Database connection successful')
})

module.exports = { db }
