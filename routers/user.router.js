const router = require('express').Router()
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middlewares/auth.middleware')

router.post('/', userController.create)
router.get('/', userController.list)
router.get('/me', isAuthenticated, userController.getCurrentUser)
router.get('/:id', userController.getUser)

module.exports = router