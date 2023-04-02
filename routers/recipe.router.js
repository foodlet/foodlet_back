const router = require('express').Router()
const recipeController = require('../controllers/recipe.controller')
const { isAuthenticated } = require('../middlewares/auth.middleware')

router.post('/', isAuthenticated, recipeController.create)

module.exports = router