const deleteCalendar = require('../model/deleteCalendar');

module.exports = async (req, res) => {
  const { role, data } = req.body;
  try {
    await deleteCalendar(role, data);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).send(err);
  }
};
