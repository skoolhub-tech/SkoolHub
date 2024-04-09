const { getRoles } = require('../model');

module.exports = async (req, res) => {
  try {
    const roles = await getRoles();
    res.status(200).send(roles);
  } catch (err) {
    res.status(500).send(err);
  }
};
