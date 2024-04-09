const { createUser } = require('../model');

module.exports = async (req, res) => {
  try {
    const userData = req.body;
    const user = await createUser(userData);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
