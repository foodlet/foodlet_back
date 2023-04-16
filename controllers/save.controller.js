const Save = require('../models/Save.model')
const {StatusCodes} = require('http-status-codes')

module.exports.getMySaves = (req, res, next) => {
  Save.find({user: req.currentUser})
    .populate('recipe')
    .then(saves => res.json(saves))
    .catch(next)
}

module.exports.createDbSave = (req, res, next) => {
  Save.create({
    user: req.currentUser,
    recipe: req.params.id
  })
    .then(save => {
      res.status(StatusCodes.CREATED).json(save)
    })
    .catch(next)
}

module.exports.createExternalSave = (req, res, next) => {
  Save.create({
    user: req.currentUser,
    externalRecipe: req.params.id
  })
    .then(save => {
      res.status(StatusCodes.CREATED).json(save)
    })
    .catch(next)
}

module.exports.deleteDbSave = (req, res, next) => {
  Save.findOne({
    user: req.currentUser,
    recipe: req.params.id
  })
    // .then(save => {
    //   res.status(StatusCodes.NO_CONTENT).json(save)
    // })
    .then(save => {
      Save.findByIdAndDelete(save.id)
        .then(response => {return res.status(StatusCodes.NO_CONTENT).json(response)})
    })
    .catch(next)
}

module.exports.deleteExternalSave = (req, res, next) => {
  Save.findOne({
    user: req.currentUser,
    externalRecipe: req.params.id
  })
    .then(save => {
      Save.findByIdAndDelete(save.id)
        .then(response => {return res.status(StatusCodes.NO_CONTENT).json(response)})
    })
    .catch(next)
}