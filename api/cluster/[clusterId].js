import { CREATED, NO_CONTENT } from 'http-status-codes'
import { findById, insertFields } from '../../database/collections/clusters'

const getCluster = async (req, res) => {
  const { clusterId } = req.query;
  const cluster = await findById(clusterId);
  res.json(cluster)
}

const updateCluster = async (req, res) => {
  const { clusterId } = req.query;
  const body = JSON.parse(req.body);
  await insertFields({ id: clusterId, fields: body.fields });
  res.status(CREATED).send('OK')
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