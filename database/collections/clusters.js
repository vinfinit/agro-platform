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

module.exports = {
  findById,
  insertFields,
};