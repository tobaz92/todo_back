const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const isEditor = require('../middleware/isEditor')
const isAdmin = require('../middleware/isAdmin')
const isSameUser = require('../middleware/isSameUser')
const isLogged = require('../middleware/user/isLogged')

// Obtenir tous les utilisateurs
router.get('/dev', UserController.getAll) // FOR DEV

// router.post('/', UserController.create)

router.get(
  '/:id',
  authMiddleware,
  isEditor,
  isLogged,
  isSameUser,
  UserController.get
)

// Delete a user
router.delete(
  '/:id',
  authMiddleware,
  isLogged,
  isSameUser,
  UserController.delete
)
router.delete('/dev/:id', UserController.delete)

// Mettre à jour un utilisateur
router.put('/:id', authMiddleware, isLogged, isSameUser, UserController.update)
router.put('/dev/:id', UserController.update)

// Authentifier un utilisateur

router.put('/logout', authMiddleware, UserController.logout) // TODO: In progress

// router.put('/logout/:id', authMiddleware, isSameUser, UserController.logout)

module.exports = router
