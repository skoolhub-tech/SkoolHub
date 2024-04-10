const updateThreshold = require('../model/updateThreshold');

module.exports = async (req, res) => {
  const { newThreshold, classId } = req.body;
  try {
    await updateThreshold(newThreshold, classId);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
