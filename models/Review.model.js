const mongoose = require('mongoose')
const { REQUIRED_FIELD } = require('../config/modelErrors.config')

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, REQUIRED_FIELD]
    },
    recipe: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Recipe',
      required: [true, REQUIRED_FIELD]
    },
    score: {
      type: Number,
      required: [true, REQUIRED_FIELD]
    },
    text: {
      type: String
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;