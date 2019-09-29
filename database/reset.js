import connectToDatabase from './connect';
import data from '../data/belarus';

const CLUSTER_COLLECTION = 'clusters';

const reset = async () => {
  const db = await connectToDatabase();
  const collection = await db.collection(CLUSTER_COLLECTION);

  await collection.deleteMany({});
  await collection.insertMany(data);

  return data
}

module.exports = reset;