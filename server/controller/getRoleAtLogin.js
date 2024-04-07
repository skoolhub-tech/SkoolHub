const { getRoleAtLogin } = require('../model');

module.exports = async (req, res) => {
  try {
    const { email } = req.params;
    const role = await getRoleAtLogin(email);
    res.status(200).send(role);
  } catch (err) {
    res.status(500).send(err);
  }
};
