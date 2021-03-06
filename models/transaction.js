const mongoose = require('mongoose')

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(), 
  },
  transaction: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  reference: {
    type: Number
  },
  message: {
    type: String
  },
})

transactionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Transaction', transactionSchema)
