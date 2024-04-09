const insertCalendar = require('../model/insertCalendar');

module.exports = async (req, res) => {
  const { role, data } = req.body;
  try {
    await insertCalendar(role, data);
    res.sendStatus(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
