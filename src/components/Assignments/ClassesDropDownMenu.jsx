// Wrap the selectable items in a container for the hover effect to work correctly
import React from 'react';
import PropTypes from 'prop-types';
import './classesDropDownMenu.css';

function ClassesDropDownMenu({ classes, setSelectedClass }) {
  function handleSelectClassClick(event) {
    setSelectedClass(event.target.textContent);
  }

  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      setSelectedClass(event.target.textContent);
    }
  }

  return (
    <div className="classes_dropdown">
      <button type="button" className="classes_drop_down_menu">
        CHOOSE A CLASS
      </button>
      {classes.map((item) => (
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

export default ClassesDropDownMenu;

ClassesDropDownMenu.propTypes = {
  classes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  setSelectedClass: PropTypes.func.isRequired,
};
