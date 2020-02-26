import { UNAUTHORIZED } from 'http-status-codes'
import { findAll } from '../../database/collections/clusters'
import { findUser } from '../../database/collections/users'

export default async (req, res) => {
  const { email, password } = req.query;
  const user = await findUser(email, password);
  if (!user) {
    return res.status(UNAUTHORIZED).send('UNAUTHORIZED')
  }
  const clusters = await findAll(user.clusters, user.role);
  res.json(clusters)
};