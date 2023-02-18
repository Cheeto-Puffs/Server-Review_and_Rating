const express = require('express')
const router = express.Router()
const controller = require('../../postgreSQL/controllers')

router.get('/reviews', controller.GetReviews.getReviews)
router.post('/reviews', controller.AddReview.addReview)
router.get('/reviews/meta', controller.GetReviewMeta.getReviewMeta)
router.put('/reviews/:review_id/helpful', controller.Helpful.markHelpful)
router.put('/reviews/:review_id/report', controller.Report.markReport)

module.exports = router
