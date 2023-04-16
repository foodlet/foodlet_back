const router = require('express').Router()
const userController = require('../controllers/user.controller')
const { isAuthenticated } = require('../middlewares/auth.middleware')
const upload = require('../config/storage.config');

router.post('/', upload.single('profilePic'), userController.create)
router.get('/', userController.list)
router.get('/me', isAuthenticated, userController.getCurrentUser)
router.get('/:id', userController.getUser)

module.exports = router