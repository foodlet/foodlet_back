const Recipe = require('../models/Recipe.model')
const { StatusCodes } = require('http-status-codes')

module.exports.create = (req, res, next) => {
  Recipe.create(req.body)
    .then(recipe => {
      res.status(StatusCodes.CREATED).json(recipe)
    })
    .catch(next)
}

module.exports.getMyRecipes = (req, res, next) => {
  Recipe.find({createdBy: req.currentUser})
    .then(recipe => res.json(recipe))
    .catch(next)
}