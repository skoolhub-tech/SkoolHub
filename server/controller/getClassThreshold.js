const { getClassThreshold } = require('../model');

module.exports = async (req, res) => {
  try {
    const { classId } = req.params;
    const threshold = await getClassThreshold(classId);
    res.status(200).send(threshold);
  } catch (err) {
    res.status(500).send(err);
  }
};
