import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './classesDropDownMenu.css';

function ClassesDropDownMenu({ classes, setSelectedClass }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  function handleSelectClassClick(event) {
    setSelectedClass(event.target.textContent);
    setIsDropdownOpen(!isDropdownOpen);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      setSelectedClass(event.target.textContent);
      setIsDropdownOpen(!isDropdownOpen);
    }
  }

  function toggleDropdown() {
    setIsDropdownOpen(!isDropdownOpen);
  }

  return (
    <div className="classes_dropdown">
      <button
        type="button"
        className="classes_drop_down_menu"
        onClick={toggleDropdown}
      >
        CHOOSE A CLASS
      </button>
      {isDropdownOpen && classes.map((item) => (
        <div
          className="select_class_button"
          role="button"
          key={item.id}
          onClick={handleSelectClassClick}
          onKeyPress={handleKeyPress}
          tabIndex={0}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}

ClassesDropDownMenu.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  setSelectedClass: PropTypes.func.isRequired,
};

export default ClassesDropDownMenu;
