import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const handleNavigation = (path) => {
    useNavigate(path);
  };

  return (
    <div className="nav-bar">
      <button
        type="button"
        onClick={() => handleNavigation('/assignments')}
        className="tab"
      >
        Assignments
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/events')}
        className="tab"
      >
        Events
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/classes')}
        className="tab"
      >
        Classes
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/emails')}
        className="tab"
      >
        Emails
      </button>
    </div>
  );
}

export default NavBar;
