import { ObjectID } from 'mongodb'
import connectToDatabase from '../connect'

const CLUSTERS_COLLECTION = 'clusters'

const insertFields = async ({ id, fields = [] }) => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  const filter = id ? {_id: ObjectID(id)} : {}
  return await collection.updateOne(filter, { $set: { fields } })
}

const findById = async id => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  const filter = id ? {_id: ObjectID(id)} : {}
  return await collection.findOne(filter)
}

const findAll = async () => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  return await collection
    .find()
    .project({ _id: 1, name: 1, location: 1 })
    .map(({ _id, name, location }) => ({ _id, name, location }))
    .toArray()
}

module.exports = {
  findById,
  insertFields,
  findAll,
};