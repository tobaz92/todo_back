const express = require('express')
const router = express.Router()

const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/user/authMiddleware')

const isEditor = require('../middleware/user/isEditor')
const isAdmin = require('../middleware/user/isAdmin')
const isSameUser = require('../middleware/user/isSameUser')

router.get('/', authMiddleware, isAdmin, UserController.getAll)
router.get('/dev', UserController.getAll)

router.get('/:id', authMiddleware, isEditor, isSameUser, UserController.get)

router.delete('/:id', authMiddleware, isSameUser, UserController.delete)
router.delete('/dev/:id', UserController.delete)

router.put('/:id', authMiddleware, isSameUser, UserController.update)
router.put('/dev/:id', UserController.update)

router.put('/logout', authMiddleware, UserController.logout) // TODO: In progress

// router.put('/logout/:id', authMiddleware, isSameUser, UserController.logout)

module.exports = router
