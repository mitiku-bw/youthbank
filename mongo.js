const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
/* Run with the command "node mongo.js password" to test */
const url =
  `mongodb+srv://mite:${password}@cluster0-xob8q.mongodb.net/test?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const transactionSchema = new mongoose.Schema({
    date: {
      type: Date,
      default: Date.now(),
      min: Date.now()  
    },
    transaction: {
      type: String,
      required: true
    },
    beneficiary_remitter: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    reference: {
      type: String
    },
    message: {
      type: String
    },
  })

const Transaction = mongoose.model('Transaction', transactionSchema)

const transaction = new Transaction({
    transaction: "self service",
    beneficiary_remitter: "Mitiku Wubetie",
    amount: -100
})

transaction.save().then(() => {
  console.log('transaction saved!')
  mongoose.connection.close()
})