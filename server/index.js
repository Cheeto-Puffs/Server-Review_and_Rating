const { connectDB } = require('../mongoDB/mongoDB.js')
const express = require('express')
const morgan = require('morgan')
const mongoRouter = require('./routers/mongoRouter.js')
const pgRouter = require('./routers/pgRouter.js')
const app = express()

require('dotenv').config()

app.use(morgan('dev'))
app.use(express.json())
app.use('/api', pgRouter)

const port = process.env.PORT || 3000

const StartServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server listening on port: ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

app.get('/api', (req, res) => {
  res.send('Test')
})

StartServer()
