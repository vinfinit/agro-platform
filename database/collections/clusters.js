import { ObjectID } from 'mongodb'
import connectToDatabase from '../connect'

const CLUSTER_COLLECTION = 'clusters'

const saveCluster = async ({ image, score = 5 }) => {
  // if (!image) {
  //   throw new Error('no image')
  // }

  // const db = await connectToDatabase()
  // await db.collection(BEE_COLLECTION).save({ image, score })
}

const findById = async id => {
  const db = await connectToDatabase()
  const collection = await db.collection(CLUSTER_COLLECTION)

  const filter = id ? {_id: ObjectID(id)} : {}
  return await collection.findOne(filter)
}

module.exports = {
  findById,
};