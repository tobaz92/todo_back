const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  userId: { type: String, required: true },
  isCompleted: { type: Boolean, default: false },
  isArchive: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
})

todoSchema.pre('save', async function (next) {
  try {
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model('Todo', todoSchema)
