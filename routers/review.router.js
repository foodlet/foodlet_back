const router = require('express').Router()
const reviewController = require('../controllers/review.controller')

router.post('/', reviewController.create)
router.get('/:id', reviewController.getReview)

module.exports = router