import { ObjectID } from 'mongodb'
import connectToDatabase from '../connect'

const CLUSTERS_COLLECTION = 'clusters'

const insertFields = async ({ id, fields = [] }) => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  const filter = id ? {_id: ObjectID(id)} : {}
  return await collection.updateOne(filter, { $set: { fields } })
}

const insertMarkers = async ({ id, markers = [] }) => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  const filter = id ? {_id: ObjectID(id)} : {}
  return await collection.updateOne(filter, { $set: { markers } })
}

const insertCircles = async ({ id, circles = [] }) => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  const filter = id ? {_id: ObjectID(id)} : {}
  return await collection.updateOne(filter, { $set: { circles } })
}

const findById = async (id: string) => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  const filter = id ? {_id: ObjectID(id)} : {}
  return await collection.findOne(filter)
}

const findAll = async (ids: string[] = [], role = '') => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTERS_COLLECTION)

  const filter = role === 'admin' ? undefined : { _id: { $in: ids.map(id => ObjectID(id)) }};

  return await collection
    .find(filter)
    .project({ _id: 1, name: 1, location: 1 })
    .map(({ _id, name, location }) => ({ _id, name, location }))
    .toArray()
}

export {
  findById,
  insertFields,
  insertMarkers,
  insertCircles,
  findAll,
};