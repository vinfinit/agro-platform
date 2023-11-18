import * as url from 'url'
import { MongoClient, ServerApiVersion } from 'mongodb'

const { MONGODB_URI } = process.env

let cachedDb = null

const connectToDatabase = async (): Promise<any> => {
  if (cachedDb) {
    return cachedDb
  }

  const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  })
  await client.connect()

  const db = await client.db('agro-platform')
  cachedDb = db
  return db
}

export default connectToDatabase