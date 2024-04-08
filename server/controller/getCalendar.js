const { getCalendar } = require('../model');

module.exports = async (req, res) => {
  try {
    const calendar = await getCalendar(req.params.email);
    res.status(200).send(calendar);
  } catch (error) {
    res.status(400).send(error);
  }
};
