const { getCurrentAssignments } = require('../model');

module.exports = async (req, res) => {
  const { role, userId } = req.params;
  const { classId } = req.query;
  try {
    const assignments = await getCurrentAssignments(role, userId, classId);
    res.status(200).send(assignments);
  } catch (error) {
    res.status(400).send(error);
  }
};
