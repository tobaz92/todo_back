const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const isEditor = require('../middleware/isEditor')
const isAdmin = require('../middleware/isAdmin')
const isSameUser = require('../middleware/isSameUser')

// Obtenir tous les utilisateurs
router.get('/', UserController.getAll) // FOR DEV

router.get('/:id', authMiddleware, isEditor, isSameUser, UserController.get)

// Delete a user
// router.delete('/:id', authMiddleware, isAdmin, UserController.delete)
router.delete('/:id', authMiddleware, isSameUser, UserController.delete)
router.delete('/dev/:id', UserController.delete)

// Mettre à jour un utilisateur
router.put('/:id', authMiddleware, isSameUser, UserController.update)

// Authentifier un utilisateur
// router.post('/login', UserController.login)

module.exports = router
