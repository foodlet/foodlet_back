const router = require('express').Router()
const apiController = require('../controllers/api.controller')

router.get('/:mainIngredient', apiController.getRecipes)

module.exports = router