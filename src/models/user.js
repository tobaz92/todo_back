const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'editor'], default: 'editor' },
  isActive: { type: Boolean, default: false },
  isBanned: { type: Boolean, default: false },
  secretKey: { type: String, default: null },
  language: { type: String, default: 'en' },
  activationToken: { type: String, default: null },
})

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next()
    }

    if (this.isNew || this.isModified('password')) {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    }

    next()
  } catch (error) {
    next(error)
  }
})

module.exports = mongoose.model('User', userSchema)
