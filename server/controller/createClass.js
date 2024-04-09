const { createClass } = require('../model');

module.exports = async (req, res) => {
  try {
    const newClassData = req.body;
    const newClass = await createClass(newClassData);
    res.status(201).json(newClass);
  } catch (err) {
    res.status(500).send(err);
  }
};
