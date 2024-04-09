const updateCalendar = require('../model/updateCalendar');

module.exports = async (req, res) => {
  const { role, data } = req.body;
  try {
    await updateCalendar(role, data);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
