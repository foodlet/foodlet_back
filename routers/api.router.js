const router = require('express').Router()
const apiController = require('../controllers/api.controller')

router.get('/:mainIngredient', apiController.getRecipes)
router.get('/:id', apiController.getRecipeDetail)

module.exports = router