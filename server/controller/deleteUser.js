const { deleteUser } = require('../model');

module.exports = async (req, res) => {
  const { userId, roleId } = req.params;
  try {
    const deletedUser = await deleteUser(userId, roleId);
    res.status(200).send(deletedUser);
  } catch (err) {
    res.status(500).send(err);
  }
};
