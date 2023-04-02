const mongoose = require('mongoose')
const { REQUIRED_FIELD } = require('../config/modelErrors.config')

const recipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, REQUIRED_FIELD]
    },
    description: {
      type: String
    },
    ingredients: [{
      name: {
        type: String,
        required: [true, REQUIRED_FIELD]
      },
      amount: {
        type: Number,
        required: [true, REQUIRED_FIELD]
      },
      measuringUnit: {
        type: String,
        required: [true, REQUIRED_FIELD]
      }
    }],
    time: {
      type: Number,
      required: [true, REQUIRED_FIELD]
    },
    skillLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'expert'],
      required: [true, REQUIRED_FIELD]
    },
    image: {
      type: String,
      default: "https://saturdaykitchenrecipes.com/wp-content/uploads/2020/04/default-recipe-image.gif"
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, REQUIRED_FIELD]
    },
    score: {
      type: Number
    },
    oven: {
      type: Boolean,
      required: [true, REQUIRED_FIELD]
    },
    fridge: {
      type: Boolean,
      required: [true, REQUIRED_FIELD]
    },
    steps: [{
      image: {
        type: String
      },
      stepNumber: {
        type: Number,
        required: [true, REQUIRED_FIELD]
      },
      heading: {
        type: String,
        required: [true, REQUIRED_FIELD]
      },
      text: {
        type: String,
        required: [true, REQUIRED_FIELD]
      }
    }]
  }
)

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe