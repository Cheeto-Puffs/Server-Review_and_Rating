const mongoose = require("mongoose")

mongoose.set("strictQuery", true)

exports.connectDB = (uri) => {
  return mongoose.connect(uri)
}
