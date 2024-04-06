const { getClasses } = require('../model');

module.exports = async (req, res) => {
  try {
    const classes = await getClasses();
    res.status(200).send(classes);
  } catch (err) {
    res.status(500).send(err);
  }
};
