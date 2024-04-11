import React from 'react';
import logo from '../../photos/skoolhub2-no-background.png';
import Login from './Login';

const LoginPage = ({ handleLogin, isLoggedIn}) => {


  return (

    <div className="login-page">
    <div className="login-logo-slogan">
      <img src={logo} alt="logo" className="login-logo" />
      <div className="slogan">
        <h3 className="welcome-message-one">Skoolhub</h3>
        <h4 className="welcome-message-two">Teaching In. Tedious Out.</h4>
      </div>
    </div>
    <Login handleLoginEvent={handleLogin} isLoggedIn={isLoggedIn} />
  </div>

  );
};

export default LoginPage;