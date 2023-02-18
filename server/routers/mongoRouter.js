const express = require('express')
const router = express.Router()
const controller = require('../../mongoDB/controllers')

router.get('/reviews_photos', controller.ReviewsPhotos.getReviewsPhotos)

module.exports = router
