const { default: mongoose } = require('mongoose')
const User = require('../models/user')

const isSameUser = async (req, res, next) => {
    const userIdFromPath = req.params.id // L'ID dans le chemin
    const userIdFromAuth = req.userId // L'ID de l'utilisateur authentifié

    if (!mongoose.Types.ObjectId.isValid(userIdFromAuth)) {
        return res.status(400).json({ error: 'Invalid user ID format' })
    }

    try {
        const user = await User.findById(userIdFromAuth)

        if (!user) {
            return res.status(404).json({ error: 'User not found' })
        }

        const userRole = user.role
        if (userRole === 'admin') {
            return next()
        }

        if (!user.isActive || user.isBanned) {
            return res.status(403).json({ error: 'Permission denied 1' })
        }

        if (userIdFromPath !== userIdFromAuth) {
            return res.status(403).json({ error: 'Permission denied 2' })
        }

        const { role, isActive, isBanned } = req.body

        if (isActive !== undefined && isBanned !== undefined) {
            return res.status(403).json({ error: 'Permission denied 3' })
        }

        if (role && role !== userRole) {
            return res.status(403).json({ error: 'Permission denied 4' })
        }

        next()
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' })
    }
}

module.exports = isSameUser
