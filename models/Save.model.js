const mongoose = require('mongoose')
const { REQUIRED_FIELD } = require('../config/modelErrors.config')

const saveSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, REQUIRED_FIELD]
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe'
    },
    externalRecipe: {
      type: String
    }
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true
    }
  }
)

const Save = mongoose.model('Save', saveSchema)

module.exports = Save