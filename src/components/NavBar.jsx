import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUserData } from './data-providers/UserDataProvider';

function NavBar({handleLogOut}) {
  const { userData } = useUserData();
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path) => {
    navigate(path);
  };

  const roleView = () => {
    if (userData.role === 1) {
      return (
        <div className="nav-bar">
          <button
            type="button"
            onClick={() => handleNavigation('homepage')}
            className={`${location.pathname === '/homepage' ? 'tab-active' : 'tab'}`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('admin')}
            className={`${location.pathname === '/admin' ? 'tab-active' : 'tab'}`}
          >
            Admin
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('emails')}
            className={`${location.pathname === '/emails' ? 'tab-active' : 'tab'}`}
          >
            Emails
          </button>
        </div>
      );
    } if (userData.role === 2) {
      return (
        <div className="nav-bar">
          <button
            type="button"
            onClick={() => handleNavigation('homepage')}
            className={`${location.pathname === '/homepage' ? 'tab-active' : 'tab'}`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('assignments')}
            className={`${location.pathname === '/assignments' ? 'tab-active' : 'tab'}`}
          >
            Assignments
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('events')}
            className={`${location.pathname === '/events' ? 'tab-active' : 'tab'}`}
          >
            Events
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('classes')}
            className={`${location.pathname === '/classes' ? 'tab-active' : 'tab'}`}
          >
            Classes
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('emails')}
            className={`${location.pathname === '/emails' ? 'tab-active' : 'tab'}`}
          >
            Emails
          </button>
        </div>
      );
    } if (userData.role === 3) {
      return (
        <div className="nav-bar">
          <button
            type="button"
            onClick={() => handleNavigation('homepage')}
            className={`${location.pathname === '/homepage' ? 'tab-active' : 'tab'}`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('assignments')}
            className={`${location.pathname === '/assignments' ? 'tab-active' : 'tab'}`}
          >
            Assignments
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('events')}
            className={`${location.pathname === '/events' ? 'tab-active' : 'tab'}`}
          >
            Events
          </button>
          <button
            type="button"
            onClick={() => handleNavigation('emails')}
            className={`${location.pathname === '/emails' ? 'tab-active' : 'tab'}`}
          >
            Emails
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      {roleView()}
      <button className="log-out-bttn" type="button" onClick={handleLogOut}>Log out</button>
    </div>
  );
}

export default NavBar;
