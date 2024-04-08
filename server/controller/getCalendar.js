const { getCalendar } = require('../model');

module.exports = async (req, res) => {
  const { role, id } = req.params;
  try {
    const calendar = await getCalendar(role, id);
    res.status(200).send(calendar);
  } catch (error) {
    res.status(400).send(error);
  }
};
