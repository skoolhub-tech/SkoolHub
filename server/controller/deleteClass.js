const { deleteClass } = require('../model');

module.exports = async (req, res) => {
  const { classId } = req.params;
  try {
    const deletedClass = await deleteClass(classId);
    res.status(200).send(deletedClass);
  } catch (err) {
    res.status(500).send(err);
  }
};
