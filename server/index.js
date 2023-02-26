const { connectDB } = require('../mongoDB/mongoDB.js')
const express = require('express')
const morgan = require('morgan')
const mongoRouter = require('./routers/mongoRouter.js')
const pgRouter = require('./routers/pgRouter.js')
const app = express()
const path = require('path')

require('dotenv').config()

app.use(morgan('dev'))
app.use(express.json())
app.use('/api', pgRouter)

const port = process.env.PORT || 3000

// // For Mongo DB
// const StartServer = async () => {
//   try {
//     await connectDB(process.env.MONGO_URI)
//     app.listen(port, () => {
//       console.log(`Server listening on port: ${port}`)
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }

app.listen(port, () => {
  console.log(`Server listening on port: ${port}`)
})

app.get(`/${process.env.LOADER_IO}`, (req, res) => {
  res.send(process.env.LOADER_IO)
})

app.get(`/${process.env.LOADER_IO}.txt`, (req, res) => {
  res.send(process.env.LOADER_IO)
})

app.get(`/${process.env.LOADER_IO}.html`, (req, res) => {
  res.send(process.env.LOADER_IO)
})

// StartServer()
