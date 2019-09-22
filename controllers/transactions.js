const transactionsRouter = require('express').Router()
const Transaction = require('../models/transaction')

transactionsRouter.get('/', async (request, response) => {
  const transactions = await Transaction.find({})
  response.json(transactions.map(transaction => transaction.toJSON()))
})

transactionsRouter.get('/:id', async (request, response, next) => {
  try{
    const transaction = await Transaction.findById(request.params.id)
    if (transaction) {
      response.json(transaction.toJSON())
    } else {
      response.status(404).end()
    }
  }catch(exception){
    next(exception)
  }
})

transactionsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const transaction = new Transaction({
    date: body.date,
    transaction: body.transaction,
    name: body.name,
    account: body.account,
    amount: body.amount,
    reference: body.reference,
    message: body.message
  })
  try {
    const savedTransaction = await transaction.save()
    response.json(savedTransaction.toJSON())
  } catch(exception) {
    next(exception)
  }
})

transactionsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Transaction.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

transactionsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const transaction = {
    date: body.date,
    transaction: body.transaction,
    name: body.name,
    account: body.account,
    amount: body.amount,
    reference: body.reference,
    message: body.message
  }

  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(request.params.id, transaction, { new: true })
    response.json(updatedTransaction.toJSON())
  } catch (exception){
    next(exception)
  }
})

module.exports = transactionsRouter