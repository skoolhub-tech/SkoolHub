const { updateSubmissionGrade } = require('../model');

module.exports = async (req, res) => {
  const { submission, role } = req.body;
  if (role !== 2) {
    res.status(401).send('Unauthorized');
    return;
  }
  try {
    const result = await updateSubmissionGrade(submission);
    res.status(200).send(result);
  } catch (err) {
    console.error('Error updating assignment grade: ', err);
    res.status(500).send(`Error updating assignment grade: ${err.message}`);
  }
};
