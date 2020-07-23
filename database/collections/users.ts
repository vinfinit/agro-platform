import connectToDatabase from '../connect'

const USERS_COLLECTION = 'users'

export const findUser = async (email: string): Promise<any> => {
  const db = await connectToDatabase()
  const collection = db.collection(USERS_COLLECTION)

  return collection.findOne({ 
    email 
  })
}

export const createUser = async (email: string, clusters?: string[]): Promise<any> => {
  const db = await connectToDatabase()
  const collection = db.collection(USERS_COLLECTION)

  return collection.insertOne({
    email,
    clusters,
  })
}