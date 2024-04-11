import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Task from './components/Task_list/Task';
import { UserDataProvider, useUserData } from './components/data-providers/UserDataProvider';
import Classes from './components/Classes/Classes';
import Admin from './components/Admin/Admin';
import Email from './components/Email/Email';
import Assignments from './components/Assignments/Assignments';
import Homepage from './components/Homepage/Homepage';
import logo from '../photos/skoolhub2-no-background.png';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (boolean) => {
    setIsLoggedIn(boolean);
  };

  const handleLogOut = () => {
    setIsLoggedIn(false);
    window.location.href = '/homepage';
    localStorage.clear();
  };

  return (
    <div className="navbar-container">
      <Router>
        <UserDataProvider>
          {isLoggedIn ? (
            <>
              <div className="after-login-logo-slogan">
                <img src={logo} alt="logo" className="after-login-logo" />
                <div className="after-slogan">
                  <h3 className="after-welcome-message-one">Skoolhub</h3>
                  <h4 className="after-welcome-message-two">Teaching In. Tedious Out.</h4>
                </div>
              </div>
              <NavBar handleLogOut={handleLogOut} />
              <Routes>
                <Route path="/homepage" element={<HomepageWithTaskCheck />} />
                <Route path="/assignments" element={<RoleBasedRoute roles={[2, 3]} component={<Assignments />} />} />
                <Route path="/events" element={<Task />} />
                <Route path="/classes" element={<RoleBasedRoute roles={[2]} component={<Classes />} />} />
                <Route path="/emails" element={<Email />} />
                <Route path="/admin" element={<RoleBasedRoute roles={[1]} component={<Admin />} />} />
                <Route path="*" element={<Navigate to="/homepage" />} />
              </Routes>
            </>
          ) : (
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
          )}
        </UserDataProvider>
      </Router>
    </div>
  );
}

function HomepageWithTaskCheck() {
  const { userData } = useUserData();
  return userData.role === 1 ? <Task /> : <Homepage />;
}

function RoleBasedRoute({ roles, component }) {
  const { userData } = useUserData();
  return roles.includes(userData.role) ? component : <Navigate to="/homepage" />;
}

RoleBasedRoute.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.number).isRequired,
  component: PropTypes.element.isRequired,
};

export default App;