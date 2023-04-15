const createHttpError = require('http-errors')
const Review = require('../models/Review.model')
const { StatusCodes } = require('http-status-codes')

module.exports.create = (req, res, next) => {
  console.log('slay')
  if(req.file) {
    req.body.image = req.file.path
  }

  const { score, text, image } = req.body
  const user = req.currentUser
  let dbRecipe = null
  let externalRecipe = null

  if(typeof req.params.id === 'string') {
    externalRecipe = req.params.id
  } else {
    dbRecipe = req.params.id
  }

  console.log(user, score, text, image)
  Review.create({
    user, externalRecipe, dbRecipe, score, text, image
  })
    .then(review => {
      res.status(StatusCodes.CREATED).json(review)
    })
    .catch(next)
}

module.exports.getReview = (req, res, next) => {
  Review.findById(req.params.id)
    .then(review => {
      if(!review) {
        next(createHttpError(StatusCodes.NOT_FOUND, 'review not found'))
      } else {
        res.json(review)
      }
    })
    .catch(next)
}

module.exports.getReviewByRecipe = (req, res, next) => {
  Review.find({dbRecipe: req.params.id})
    .then(review => {
      if(!review) {
        Review.find({externalRecipe: req.params.id})
          .then(externalReview => res.json(externalReview))
          .catch(next)
      } else {
        res.json(review)
      }
    })
    .catch(next)
}