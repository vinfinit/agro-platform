import { findAll } from '../../database/collections/clusters'

export default async (req, res) => {
  const clusters = await findAll();
  res.json(clusters)
};