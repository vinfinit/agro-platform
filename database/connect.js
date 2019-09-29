const url = require('url')
import { MongoClient } from 'mongodb'

const { MONGODB_URI } = process.env

let cachedDb = null

const connectToDatabase = async () => {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

  const db = await client.db(url.parse(MONGODB_URI).pathname.substr(1))

  cachedDb = db
  return db
}

module.exports = connectToDatabase;