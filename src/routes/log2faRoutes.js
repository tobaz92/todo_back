const express = require('express')
const router = express.Router()
const otplib = require('otplib')
const qrcode = require('qrcode')

const UserModel = require('../models/user')

// Generate and save a secret key for the user
router.post('/generate-secret-key', async (req, res) => {
  const { userId } = req.body

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' })
  }

  // Find the user by ID
  const user = await UserModel.findById(userId)

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  // Generate a new secret key
  const secretKey = otplib.authenticator.generateSecret()

  // Generate a TOTP code based on the secret key
  const totpCode = otplib.authenticator.generate(secretKey)

  // Save the secret key to the user
  user.secretKey = secretKey ?? user.secretKey

  // Update the user with the new secret key
  const updatedUser = await user.save()

  // Generate the OTPAuth URL for the user
  const otpauthURL = otplib.authenticator.keyuri(
    user.username,
    'todo_back', // TODO: Replace with your app name
    secretKey
  )

  // Generate a QR code image based on the OTPAuth URL
  qrcode.toDataURL(otpauthURL, (err, imageUrl) => {
    if (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error generating QR code' })
    }

    // Return the success message and QR code image URL
    res.json({
      message: 'Secret key generated successfully',
      totpCode,
      imageUrl,
    })
  })
})

// Enable 2FA for the user with the provided TOTP code
router.post('/enable-2fa', async (req, res) => {
  const { userId, totp } = req.body

  if (!userId || !totp) {
    return res.status(400).json({ error: 'userId and totp is required' })
  }

  // Find the user by ID
  const user = await UserModel.findById(userId)

  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }

  // Check if the provided TOTP code is valid for the user's secret key
  const isValid = otplib.authenticator.check(totp, user.secretKey)

  if (isValid) {
    // Update the user's status to active (2FA enabled)
    user.isActive = true

    // Save the updated user
    const updatedUser = await user.save()

    // Return success message
    res.json({ message: '2FA enabled successfully' })
  } else {
    // Return an error if the TOTP code is invalid
    res.status(401).json({ error: 'Invalid token, 2FA not enabled' })
  }
})
router.get('/', async (req, res) => {
  res.json({ message: '2FA router' })
})

module.exports = router
