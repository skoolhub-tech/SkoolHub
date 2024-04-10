const { getUserClasses } = require('../model');

module.exports = async (req, res) => {
  try {
    const classes = await getUserClasses(req.params.email);
    res.status(200).send(classes);
  } catch (error) {
    res.status(400).send(error);
  }
};
