import React, { useState } from 'react';
import './styles.css';
import {
  BrowserRouter as Router, Route, Routes, Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import Task from './components/Task_list/Task';
import { UserDataProvider } from './components/data-providers/UserDataProvider';
import Classes from './components/Classes/Classes';
import Admin from './components/Admin/Admin';
import Email from './components/Email/Email';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
                <Route path="/skoolhub/homepage" element={<h1>Homepage</h1>} />
                <Route path="/skoolhub/assignments" element={<h1>Assignments</h1>} />
                <Route path="/skoolhub/events" element={<Task />} />
                <Route path="/skoolhub/classes" element={<Classes />} />
                <Route path="/skoolhub/emails" element={<Email />} />
                <Route path="/skoolhub/admin" element={<Admin />} />
                { // redrect if route doesn't match anything
                }
                <Route path="*" element={<Navigate to="/skoolhub/homepage" />} />
              </Routes>
            </>
          ) : (
            <div className="login-page">
              <h1 className="login-h1">SkoolHub</h1>
              <p className="login-p">Teaching in. Tedious out.</p>
              <Login handleLoginEvent={handleLogin} isLoggedIn={isLoggedIn} />
            </div>
          )}
        </Router>
      </UserDataProvider>
    </div>
  );
}

export default App;
