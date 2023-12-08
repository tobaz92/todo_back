const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  isArchive: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
})

projectSchema.pre('save', async function (next) {
  try {
    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model('Project', projectSchema)
