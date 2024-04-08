const { login } = require('../model');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.query;

    // eslint-disable-next-line consistent-return
    login(email, password, (err, token, user) => {
      if (err) {
        console.error('Error logging in:', err);
        return res.status(500).send('Error retrieving user from database');
      }
      if (!user) {
        console.log(user);
        return res.status(401).send('Invalid email or password');
      }

      // Assuming you want to send both token and user info back to the client
      const response = {
        message: 'Login successful!',
        token,
        user,
      };

      res.status(200).send(response); // Changed response structure
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
