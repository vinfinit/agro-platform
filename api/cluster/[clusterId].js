import { OK, NO_CONTENT } from 'http-status-codes'
import { findById } from '../../database/collections/clusters'

const getCluster = async (req, res) => {
  const { clusterId } = req.query;
  const cluster = await findById(clusterId);
  res.json(cluster)
}

const updateCluster = async (req, res) => {
  console.log(JSON.parse(req.body));
  res.send('OK')
}

export default async (req, res) => {
  if (req.method === 'GET') {
    return getCluster(req, res)
  }

  if (req.method === 'POST') {
    return updateCluster(req, res)
  }

  res
    .status(NO_CONTENT)
    .send('Endpoint not found')
};