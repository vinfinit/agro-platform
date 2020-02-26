import connectToDatabase from '../connect'

const USERS_COLLECTION = 'users'

const findUser = async (email, password) => {
  const db = await connectToDatabase()
  const collection = await db.collection(USERS_COLLECTION)

  const filter = { email, password }
  return await collection.findOne(filter)
}

module.exports = {
  findUser,
};