const db = require('../model');

const controller = {
  userLogin: function(req, res) {
    const { email, password } = req.query;

    db.login(email, password, (err, token, user) => {
      if (err) {
        console.error('Error logging in:', err);
        return res.status(500).send('Error retrieving user from database');
      } if (!user) {
        console.log(user)
        return res.status(401).send('Invalid email or password');
      }

      // Assuming you want to send both token and user info back to the client
      const response = {
        token: token,
        user: user
      };

      res.status(200).send(response);
    });
  },
};

module.exports = controller;
