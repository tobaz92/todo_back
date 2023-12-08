const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')

const isEditor = require('../middleware/isEditor')
const isAdmin = require('../middleware/isAdmin')
const isSameUser = require('../middleware/isSameUser')

// Obtenir tous les utilisateurs
router.get('/dev', (req, res) => UserController.getAllUsers(req, res)) // FOR DEV

router.get('/:id', authMiddleware, isEditor, isSameUser, UserController.getUser)

// Créer un nouvel utilisateur
router.post('/signin', UserController.createUser)

// Delete a user
router.delete('/:id', authMiddleware, isAdmin, UserController.deleteUser)

// Mettre à jour un utilisateur
router.put('/:id', authMiddleware, isSameUser, UserController.updateUser)

// Authentifier un utilisateur
router.post('/login', UserController.loginUser)

module.exports = router
