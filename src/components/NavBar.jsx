import React from 'react';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="nav-bar">
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/assignments')}
        className="tab"
      >
        Assignments
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/events')}
        className="tab"
      >
        Events
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/classes')}
        className="tab"
      >
        Classes
      </button>
      <button
        type="button"
        onClick={() => handleNavigation('/skoolhub/emails')}
        className="tab"
      >
        Emails
      </button>
    </div>
  );
}

export default NavBar;
