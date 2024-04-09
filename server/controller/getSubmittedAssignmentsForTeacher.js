/* eslint-disable no-console */
const { getSubmissionsForAssignment } = require('../model');

module.exports = async (req, res) => {
  try {
    const { id } = req.query;
    const assignments = await getSubmissionsForAssignment(id);
    res.status(200).send(assignments);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error getting assignments for class.');
  }
};
