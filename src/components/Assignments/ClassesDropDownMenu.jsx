import React from 'react';
import PropTypes from 'prop-types';
import './classesDropDownMenu.css';

function ClassesDropDownMenu({ classes, setSelectedClass }) {
  return (
    <div>
      <select
        type="button"
        className="classes_drop_down_menu"
        onChange={(e) => setSelectedClass(e.target.value)}
      >
        <option value="">Choose a Class</option>
        {classes.map((item) => (
          <option
            className="select_class_button"
            key={item.id}
            tabIndex={0}
          >
            {item.name}
          </option>
        ))}
      </select>
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
