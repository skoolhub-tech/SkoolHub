import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="nav-bar">
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/homepage')}
        className={`${location.pathname === '/skoolhub/homepage' ? 'tab-active' : 'tab'}`}
      >
        Home
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/assignments')}
        className={`${location.pathname === '/skoolhub/assignments' ? 'tab-active' : 'tab'}`}
      >
        Assignments
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/events')}
        className={`${location.pathname === '/skoolhub/events' ? 'tab-active' : 'tab'}`}
      >
        Events
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/classes')}
        className={`${location.pathname === '/skoolhub/classes' ? 'tab-active' : 'tab'}`}
      >
        Classes
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/emails')}
        className={`${location.pathname === '/skoolhub/emails' ? 'tab-active' : 'tab'}`}
      >
        Emails
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/admin')}
        className={`${location.pathname === '/skoolhub/admin' ? 'tab-active' : 'tab'}`}
      >
        Admin
      </button>
    </div>
  );
}

export default NavBar;
