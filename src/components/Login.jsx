// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import emailjs from '@emailjs/browser';
// import speakeasy from 'speakeasy';
// import { v4 as uuidv4 } from 'uuid';

// function Login() {
//   const [loginInfo, setLoginInfo] = useState({
//     username: '',
//     password: '',
//     code: '',
//     enteredCode: '',
//     submitted: false,
//   });
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [showCodeInput, setShowCodeInput] = useState(false);

//   useEffect(() => {
//     const sessionToken = localStorage.getItem('sessionToken');
//     const localLoggedIn = localStorage.getItem('loggedIn');
//     const date = localStorage.getItem('date');

//     if (!sessionToken) {
//       setLoggedIn(false);
//     } else {
//       const expiredTime = 30 * 60 * 1000;
//       const storedTime = localStorage.getItem('date');
//       const currentTime = Date.now();

//       if (currentTime - storedTime > expiredTime) {
//         setLoggedIn(false);
//       } else {
//         setLoggedIn(true);
//       }
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem('sessionToken');
//     localStorage.removeItem('username');
//     localStorage.removeItem('date');
//     setLoggedIn(false);
//     setLoginInfo({
//       username: '',
//       password: '',
//       code: '',
//       enteredCode: '',
//       submitted: false,
//     });
//   };

//   const generateSessionToken = () => uuidv4();

//   const generateOTP = () =>
//     // Generate a 6-digit OTP using speakeasy
//     speakeasy.totp({ secret: 'your_secret_key', digits: 6 });
//   const authenticateUser = async (username, password) => ({
//     username: 'testUser',
//     password: 'testPassword',
//     email: 'nhu.le1236@gmail.com',

//     // try {
//     //   const response = await axios.get('');
//     //   return response.data;
//     // } catch (err) {
//     //   console.error('Error fetching user', err);
//     //   throw err;
//     // }
//   });

//   const sendCodeByEmail = async (email, code) => {
//     try {
//       await emailjs.send('service_haho0x7', 'template_t837vcp', {
//         to_email: email,
//         message: code,
//       }, '0N-1NSzAKcK0vEt7G');
//       console.log('Code sent successfully');
//     } catch (err) {
//       console.error('Error sending code', err);
//       throw err;
//     }
//   };

//   const handleLogin = async () => {
//     try {
//       const user = await authenticateUser(loginInfo.username, loginInfo.password);

//       if (user && user.password === loginInfo.password) {
//         const code = generateOTP(); // Generate OTP using speakeasy
//         await sendCodeByEmail(user.email, code);
//         setShowCodeInput(true);
//       } else {
//         alert('Invalid credentials');
//         console.log('Invalid credentials');
//       }
//     } catch (err) {
//       console.error('Error logging in', err);
//     }
//   };

//   const handleCodeVerification = (e) => {
//     e.preventDefault();
//     if (loginInfo.code === loginInfo.enteredCode) {
//       setLoggedIn(true);
//       const sessionToken = generateSessionToken();
//       localStorage.setItem('sessionToken', sessionToken);
//       localStorage.setItem('username', loginInfo.username);
//       localStorage.setItem('date', Date.now());
//     } else {
//       alert('Invalid code');
//     }
//   };

//   const handleLoginPage = () => {
//     if (loggedIn) {
//       return (
//         <div>
//           Welcome,
//           {' '}
//           {loginInfo.username || localStorage.getItem('username')}
//         </div>
//       );
//     } if (loginInfo.submitted) {
//       return (
//         <form onSubmit={handleCodeVerification}>
//           <label htmlFor="code">Code</label>
//           <input
//             name="code"
//             type="text"
//             id="code"
//             value={loginInfo.enteredCode}
//             onChange={(e) => setLoginInfo({ ...loginInfo, enteredCode: e.target.value })}
//           />
//           <button type="submit">Verify Code</button>
//         </form>
//       );
//     }
//     return (
//       <form onSubmit={handleLogin}>
//         <label htmlFor="username">Username</label>
//         <input
//           name="username"
//           type="text"
//           id="username"
//           value={loginInfo.username}
//           onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
//         />
//         <label htmlFor="password">Password</label>
//         <input
//           name="password"
//           type="text"
//           id="password"
//           value={loginInfo.password}
//           onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
//         />
//         <button type="submit">Log In</button>
//       </form>
//     );
//   };

//   return (
//     <div className="login-form">
//       {handleLoginPage()}
//     </div>
//   );
// }

// export default Login;

// 2-factor without library
/// ///////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    username: '',
    password: '',
    code: '',
    enteredCode: '',
    submitted: false,
  });
  const [loggedIn, setLoggedIn] = useState(false);

  // handles logout after period of time
  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('username');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('date');
    setLoggedIn(false);
    setLoginInfo({
      username: '',
      password: '',
      code: '',
      enteredCode: '',
      submitted: false,
    });
  };

  // checks for localstorage session token on refresh to keep user logged in
  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    const localLoggedIn = localStorage.getItem('loggedIn');
    const date = localStorage.getItem('date');

    if (!sessionToken) {
      setLoggedIn(false);
    } else {
      const expiredTime = 30 * 60 * 1000;
      const storedTime = localStorage.getItem('date');
      const currentTime = Date.now();

      if (currentTime - storedTime > expiredTime) {
        handleLogout();
      } else {
        setLoggedIn(true);
      }
    }
  }, []);

  const generateSessionToken = () => uuidv4();

  // hardcoded for testing this will be replaced with a get request to the database
  const authenticateUser = async (username, password) => ({
    username: 'testUser',
    password: 'testPassword',
    email: 'nhu.le1236@gmail.com',
  });

  // generates code for two factor authentication
  const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  // sends code to user's email
  const sendCodeByEmail = async (email, code) => {
    try {
      await emailjs.send('service_haho0x7', 'template_t837vcp', {
        to_email: email,
        message: code,
      }, '0N-1NSzAKcK0vEt7G');
      console.log('Code sent successfully');
    } catch (err) {
      console.error('Error sending code', err);
      throw err;
    }
  };

  // handles form login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await authenticateUser(loginInfo.username, loginInfo.password);

      if (user && user.password === loginInfo.password) {
        const code = generateRandomCode();
        await sendCodeByEmail(user.email, code);
        setLoginInfo({ ...loginInfo, code, submitted: true });
      } else {
        alert('Invalid credentials');
        console.log('Invalid credentials');
      }
    } catch (err) {
      console.error('Error logging in', err);
    }
  };

  // handles code verification
  const handleCodeVerification = (e) => {
    e.preventDefault();
    if (loginInfo.code === loginInfo.enteredCode) {
      setLoggedIn(true);
      const sessionToken = generateSessionToken();
      localStorage.setItem('sessionToken', sessionToken);
      localStorage.setItem('username', loginInfo.username);
      localStorage.setItem('loggedIn', 'true');
      localStorage.setItem('date', Date.now());
    } else {
      alert('Invalid code');
    }
  };

  // handles conditional rendering of login page
  const handleLoginPage = () => {
    if (loggedIn) {
      return (
        <div>
          Welcome,
          {' '}
          {loginInfo.username ? loginInfo.username : localStorage.getItem('username')}

        </div>
      );
    } if (loginInfo.submitted) {
      return (
        <form className="login-form" onSubmit={handleCodeVerification}>
          <label htmlFor="code">Code</label>
          <input
            name="code"
            type="text"
            id="code"
            value={loginInfo.enteredCode}
            onChange={(e) => { setLoginInfo({ ...loginInfo, enteredCode: e.target.value }); }}
          />
          <button type="submit">Verify Code</button>
        </form>
      );
    }
    return (
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          name="username"
          type="text"
          id="username"
          value={loginInfo.username}
          onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          name="password"
          type="text"
          id="password"
          value={loginInfo.password}
          onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
        />
        <button className="login-button" type="submit">Log In</button>
      </form>
    );
  };

  return (
    <div>
      {handleLoginPage()}
    </div>
  );
}

export default Login;
