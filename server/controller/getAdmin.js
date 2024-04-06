const { getAdmin } = require('../model');

module.exports = async (req, res) => {
  try {
    const admins = await getAdmin();
    res.status(200).send(admins);
  } catch (err) {
    res.status(500).send(err);
  }
};
