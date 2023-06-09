const router = require('express').Router()
const reviewController = require('../controllers/review.controller')
const { isAuthenticated } = require('../middlewares/auth.middleware')
const upload = require('../config/storage.config');

router.post('/:id', isAuthenticated, upload.single('image'), reviewController.create)
// router.get('/:id', reviewController.getReview)
router.get('/me', isAuthenticated, reviewController.getMyReviews)
router.get('/:id', reviewController.getReviewsByRecipe)


module.exports = router