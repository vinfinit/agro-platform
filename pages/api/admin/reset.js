import resetDb from '../../../database/reset';

module.exports = async (req, res) => {
  const data = await resetDb();

  res.status(200).json(data)
}