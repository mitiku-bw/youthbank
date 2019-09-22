// require('dotenv').config()

let PORT = process.env.PORT || 3003
let MONGODB_URI = MONGODB_URI=`mongodb+srv://mite:phonebook@cluster0-xob8q.mongodb.net/test?retryWrites=true`

// let MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT
}
