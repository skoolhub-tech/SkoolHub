import React, { useState } from 'react';
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

function HomepageWithTaskCheck() {
  const { userData } = useUserData();

  return userData.role === 1 ? <Task /> : <h1>Homepage</h1>;
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogin = (boolean) => {
    setIsLoggedIn(boolean);
  };

  return (
    <div className="navbar-container">
      <UserDataProvider>
        <Router>
          {isLoggedIn ? (
            <>
              {/* <h1>SkoolHub</h1> */}
              <NavBar />
              <Routes>
                <Route path="/homepage" element={(<HomepageWithTaskCheck />)} />
                <Route path="/assignments" element={<Assignments />} />
                <Route path="/events" element={<Task />} />
                <Route path="/classes" element={<Classes />} />
                <Route path="/emails" element={<Email />} />
                <Route path="/admin" element={<Admin />} />
                { // redrect if route doesn't match anything
                }
                <Route path="*" element={<Navigate to="/homepage" />} />
              </Routes>
            </>
          ) : (
            <div className="login-page">
              <div>
                <h1 className="login-h1">SkoolHub</h1>
                <p className="login-p">Teaching in. Tedious out.</p>
              </div>
              <Login handleLoginEvent={handleLogin} isLoggedIn={isLoggedIn} />
            </div>
          )}
        </Router>
      </UserDataProvider>
    </div>
  );
}

export default App;
