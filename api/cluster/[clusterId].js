import clusters from '../../database/collections/clusters'

module.exports = async (req, res) => {
  const { clusterId } = req.query;
  const cluster = await clusters.findById(clusterId);

  res.json(cluster)
};