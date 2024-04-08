const { getCurrentAssignments } = require('../model');

module.exports = async (req, res) => {
  const { role, id } = req.params;
  try {
    const assignments = await getCurrentAssignments(role, id);
    res.status(200).send(assignments);
  } catch (error) {
    res.status(400).send(error);
  }
};
