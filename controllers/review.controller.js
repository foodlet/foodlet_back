const createHttpError = require('http-errors')
const Review = require('../models/Review.model')
const { StatusCodes } = require('http-status-codes')

module.exports.create = (req, res, next) => {
  Review.create(req.body)
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