const ReviewsPhotos = require('../models/Reviews_Photos.js')

module.exports = {
  getReviewsPhotos: async (req, res) => {
    console.log('MONGO controller')
    try {
      const reviewsPhotos = await ReviewsPhotos.find({}).limit(10)
      res.status(200).json(reviewsPhotos)
    } catch (error) {
      res.status(500).json({ msg: error })
    }
  },
}
