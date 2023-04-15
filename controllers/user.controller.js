const createHttpError = require('http-errors')
const User = require('../models/User.model')
const {StatusCodes} = require('http-status-codes')

module.exports.create = (req, res, next) => {
  if(req.file) {
    req.body.profilePic = req.file.path
  }

  const {
    firstName, lastName, username, email, password, profilePic, foodAlergies, vegan, vegetarian
  } = req.body

  User.create({
    firstName, lastName, username, email, password, profilePic, foodAlergies, vegan, vegetarian
  })
    .then(createdUser => {
      res.status(StatusCodes.CREATED).json(createdUser)
    })
    .catch(next)
}

module.exports.list = (req, res, next) => {
  User.find()
    .then(users => res.json(users))
    .catch(next)
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      if(!user) {
        next(createHttpError(StatusCodes.NOT_FOUND, 'user not found'))
      } else {
        res.json(user)
      }
    })
    .catch(next)
}

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then(user => {
      if(!user) {
        next(createHttpError(StatusCodes.NOT_FOUND, 'user not found'))
      } else {
        res.json(user)
      }
    })
    .catch(next)
}