// 2-factor without library
/// ///////////////////////////////////////////////////////////////////////////////
import React, { useState, useEffect, useContext } from 'react';
import emailjs from '@emailjs/browser';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useUserData } from './data-providers/UserDataProvider';

function Login({ handleLoginEvent }) {
  const { userState } = useContext(useUserData);
  const { setUserData } = userState;
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    code: '',
    enteredCode: '',
    submitted: false,
  });

  const setUserRole = (email, password) => {
    axios.post('skoolhub/login/role', { email, password })
      .then((response) => {
        setUserData({
          role: response.data.role,
          email,
        });
      })
      .catch((error) => console.error({
        Message: 'Error retrieving role.',
        Error: error,
      }));
  };

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

  // handles logout after period of time
  const handleLogout = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('email');
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('date');
    handleLoginEvent(false);
    setLoginInfo({
      username: '',
      password: '',
      code: '',
      enteredCode: '',
      submitted: false,
    });
    setUserData({ role: null, email: null });
  };

  useEffect(() => {
    const sessionToken = localStorage.getItem('sessionToken');
    // const localLoggedIn = localStorage.getItem('loggedIn');
    // const localEmail = localStorage.getItem('email');
    // const date = localStorage.getItem('date');

    if (!sessionToken) {
      handleLoginEvent(false);
      setUserData({ role: null, email: null });
    } else {
      const expiredTime = 30 * 60 * 1000;
      const storedTime = localStorage.getItem('date');
      const currentTime = Date.now();
      if (currentTime - storedTime > expiredTime) {
        handleLogout();
      } else {
        handleLoginEvent(true);
        setUserRole(loginInfo.email, loginInfo.password);
      }
    }
  }, []);

  // checks for localstorage session token on refresh to keep user logged in

  const generateSessionToken = () => uuidv4();

  // handles form login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('/skoolhub/login', {
        params: { email: loginInfo.email, password: loginInfo.password },
      });

      console.log('Responses', response);
      await sendCodeByEmail('nhu.le1236@gmail.com', response.data.token);
      setLoginInfo({ ...loginInfo, code: response.data.token, submitted: true });
    } catch (err) {
      console.log('Error fetching user', err);
      alert('Invalid credentials');
      throw err;
    }
  };

  // handles code verification
  const handleCodeVerification = (e) => {
    e.preventDefault();
    if (loginInfo.code === loginInfo.enteredCode) {
      handleLoginEvent(true);
      setUserRole(loginInfo.email, loginInfo.password);
      const sessionToken = generateSessionToken();
      localStorage.setItem('sessionToken', sessionToken);
      localStorage.setItem('date', Date.now());
      localStorage.setItem('email', loginInfo.email);
    } else {
      console.log('code', loginInfo.code, 'entered', loginInfo.enteredCode);
      alert('Invalid code');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  // handles conditional rendering of login page
  const handleLoginPage = () => {
    if (loginInfo.submitted) {
      return (
        <form className="login-form" onSubmit={handleCodeVerification}>
          <label htmlFor="code">Code</label>
          <input
            name="enteredCode"
            type="text"
            id="code"
            value={loginInfo.enteredCode}
            onChange={handleChange}
          />
          <button type="submit">Verify Code</button>
        </form>
      );
    }
    return (
      <form className="login-form" onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          id="email"
          value={loginInfo.email}
          onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
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

Login.propTypes = {
  handleLoginEvent: PropTypes.func.isRequired,
};

export default Login;
