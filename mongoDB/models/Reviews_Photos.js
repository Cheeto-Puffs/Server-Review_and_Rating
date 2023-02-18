const mongoose = require('mongoose')

const ReviewsPhotos = new mongoose.Schema({
  id: Number,
  review_id: Number,
  url: String,
})

module.exports = mongoose.model('Reviews_Photos', ReviewsPhotos)
