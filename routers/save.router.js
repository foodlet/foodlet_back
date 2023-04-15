const router = require('express').Router()
const saveController = require('../controllers/save.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/me', authMiddleware.isAuthenticated, saveController.getMySaves)
router.post('/:id', authMiddleware.isAuthenticated, saveController.createDbSave)
router.post('/external/:id', authMiddleware.isAuthenticated, saveController.createExternalSave)
router.delete('/:id', authMiddleware.isAuthenticated, saveController.deleteDbSave)
router.delete('/external/:id', authMiddleware.isAuthenticated, saveController.deleteExternalSave)

module.exports = router