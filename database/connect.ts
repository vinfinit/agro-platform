import * as url from 'url'
import { MongoClient } from 'mongodb'

const { MONGODB_URI } = process.env

let cachedDb = null

const connectToDatabase = async (): Promise<any> => {
  if (cachedDb) {
    return cachedDb
  }

  const options: any = { useNewUrlParser: true, useUnifiedTopology: true }
  const client = await MongoClient.connect(MONGODB_URI, options, null)

  const db = await client.db(url.parse(MONGODB_URI).pathname.substr(1))

  cachedDb = db
  return db
}

export default connectToDatabase