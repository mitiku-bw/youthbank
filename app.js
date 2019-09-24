const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const cors = require('cors')
const transactionsRouter = require('./controllers/transactions')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const logger = require('./utils/logger')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

app.use(cors())
//app.use(express.static('build'))
// app.use('/', express.static(__dirname + '/build'));

app.use(bodyParser.json())
app.use(middleware.requestLogger)
if(process.env.PORT === 'production'){
  app.use(app.use(express.static('build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}


app.use('/api/transactions', transactionsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app