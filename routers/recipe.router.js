const router = require('express').Router()
const recipeController = require('../controllers/recipe.controller')
const { isAuthenticated } = require('../middlewares/auth.middleware')
const upload = require('../config/storage.config');

router.post('/', isAuthenticated, upload.single('image'), recipeController.create)
router.get('/me', isAuthenticated, recipeController.getMyRecipes)
router.get('/me/:id', isAuthenticated, recipeController.getMyRecipesDetail)
router.delete('/:id', isAuthenticated, recipeController.deleteRecipe)
router.post('/:id', isAuthenticated, recipeController.editRecipe)

module.exports = router