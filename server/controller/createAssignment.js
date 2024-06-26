const { createAssignment } = require('../model');

module.exports = async (req, res) => {
  const { assignment, role } = req.body;
  if (role !== 2) {
    res.status(401).send('Unauthorized');
    return;
  }
  try {
    const result = await createAssignment(assignment);
    res.status(201).send(result);
  } catch (err) {
    console.error('Error creating assignment: ', err);
    res.status(500).send(`Error creating assignment: ${err.message}`);
  }
};
