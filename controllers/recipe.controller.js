const Recipe = require('../models/Recipe.model')
const { StatusCodes } = require('http-status-codes')

module.exports.create = (req, res, next) => {
  if(req.file) {
    req.body.image = req.file.path
  }

  const { name, description, time, skillLevel, oven, fridge, image } = req.body

  const ingredients = JSON.parse(req.body.ingredients)
  const steps = JSON.parse(req.body.steps)

  const createdBy = req.currentUser

  Recipe.create({
    name, description, ingredients, time, skillLevel, createdBy, oven, fridge, steps, image, createdBy
  })
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

module.exports.getMyRecipesDetail = (req, res, next) => {
  Recipe.findById(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(next)
}

module.exports.deleteRecipe = (req, res, next) => {
  Recipe.findByIdAndDelete(req.params.id)
    .then(recipe => res.json(recipe))
    .catch(next)
}

module.exports.editRecipe = (req, res, next) => {
  if(req.file) {
    req.body.image = req.file.path
  }

  const ingredients = JSON.parse(req.body.ingredients)
  const steps = JSON.parse(req.body.steps)

  const { name, description, time, skillLevel, oven, fridge, image } = req.body

  Recipe.findByIdAndUpdate(
    req.params.id,
    {
      name, description, ingredients, time, skillLevel, oven, fridge, steps, image
    }, 
    {new: true})
      .then(recipe => res.json(recipe))
      .catch(next)
}

module.exports.getFeedRecipes = (req, res, next) => {
  Recipe.find({createdBy: {$ne: req.currentUser}})
    .then(recipes => {
      console.log(recipes)
      res.json(recipes)
    })
    .catch(next)
}

module.exports.getRecipes = (req, res, next) => {
  Recipe.find()
    .then(recipes => res.json(recipes))
    .catch(next)
}

// navigate('/list', { state: { products: 'cosas '}})

// const { state } = useLocation()
// const { products } = state


// navigate('/list?search=,askfkaslhf,d')