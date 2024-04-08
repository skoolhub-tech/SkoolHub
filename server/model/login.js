const speakeasy = require('speakeasy');
// const emailjs = require('@emailjs/browser');
const createClient = require('../database/db');

const generateOTP = (password) => {
  const secret = password;

  return speakeasy.totp({
    secret,
    encoding: 'base32',
  });
};

// const sendTokenByEmail = (email, token) => {
//   // Server-side environment
//   const templateParams = {
//     to_email: email,
//     token,
//   };

//   return new Promise((resolve, reject) => {
//     emailjs
//       .send('service_haho0x7', 'template_t837vcp', templateParams, '0N-1NSzAKcK0vEt7G')
//       .then((result) => {
//         console.log('Email sent');
//         resolve(result);
//       })
//       .catch((error) => {
//         console.error('Error sending email:', error);
//         reject(error);
//       });
//   });
// };

module.exports = async (email, password, callback) => {
  const client = createClient();
  client.connect();

  // Define the query to check credentials
  const query = {
    text: 'SELECT * FROM credentials WHERE email = $1',
    values: [email],
  };

  // Execute the query to check credentials
  client.query(query, (err, result) => {
    if (err) {
      console.error('Error executing query:', err);
      callback(err, null, null); // Pass error and null for both token and user info
      return;
    }

    if (result.rows.length === 0) {
      // If no matching user found
      callback(null, null, null); // Pass null for both token and user info
      return;
    }

    const user = result.rows[0];
    // Compare passwords
    if (user.password === password) {
      // Passwords match
      const token = generateOTP(user.password); // Generate TOTP token
      callback(null, token, user); // Pass null for error, token, and user info
    } else {
      // Incorrect password
      callback(null, null, null); // Pass null for both token and user info
    }
  });
};
