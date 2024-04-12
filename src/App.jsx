import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import NavBar from './components/NavBar';
import Task from './components/Task_list/Task';
import { UserDataProvider, useUserData } from './components/data-providers/UserDataProvider';
import Classes from './components/Classes/Classes';
import Admin from './components/Admin/Admin';
import Email from './components/Email/Email';
import Assignments from './components/Assignments/Assignments';
import BusAnimation from './animations/BusAnimation';
import MiniVanAnimation from './animations/MiniVanAnimation';
import HomepageWithTaskCheck from './components/HomepageWithTaskCheck';
import LandingPage from './components/LandingPage';
import logo from '../photos/skoolhub2-no-background.png';
import LoginPage from './components/LoginPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [busAnimationComplete, setBusAnimationComplete] = useState(true);
  const [vanAnimationComplete, setVanAnimationComplete] = useState(true);

  const handleLogin = (boolean) => {
    setIsLoggedIn(boolean);
    setBusAnimationComplete(false);
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
                <Route
                  path="/homepage"
                  element={(
                    <div>
                      {!busAnimationComplete && (
                        <BusAnimation onComplete={() => setBusAnimationComplete(true)} />
                      )}
                      {busAnimationComplete && <HomepageWithTaskCheck />}
                    </div>
                  )}
                />
                <Route path="/assignments" element={<RoleBasedRoute roles={[2, 3]} component={<Assignments />} />} />
                <Route path="/events" element={<Task />} />
                <Route path="/classes" element={<RoleBasedRoute roles={[2]} component={<Classes />} />} />
                <Route path="/emails" element={<Email />} />
                <Route path="/admin" element={<RoleBasedRoute roles={[1]} component={<Admin />} />} />
                <Route path="*" element={<Navigate to="/homepage" />} />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage triggerAnimation={() => setVanAnimationComplete(false)} />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route
                path="/login"
                element={(
                  <div>
                    {!vanAnimationComplete && (
                      <MiniVanAnimation onComplete={() => setVanAnimationComplete(true)} />
                    )}
                    {vanAnimationComplete && (
                    <LoginPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} />
                    )}
                  </div>
                )} />
            </Routes>
          )}
        </UserDataProvider>
      </Router>
    </div>
  );
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
