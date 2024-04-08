import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location.pathname);
  const handleNavigation = (path) => {
    navigate(path);
  };

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
      <button
        type="button"
        onClick={() => handleNavigation('admin')}
        className={`${location.pathname === '/admin' ? 'tab-active' : 'tab'}`}
      >
        Admin
      </button>
    </div>
  );
}

export default NavBar;
