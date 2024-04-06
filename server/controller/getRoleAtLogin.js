const { getRoleAtLogin } = require('../model');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    const role = await getRoleAtLogin(email, password);
    res.status(200).send(role);
  } catch (err) {
    res.status(500).send(err);
  }
};
