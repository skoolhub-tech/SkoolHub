/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import './classesDropDownMenu.css';

function ClassesDropDownMenu({
  classes,
  setSelectedClass,
  setClassObjForEmail,
  setSubmitAssignmentModalIsOpen,
}) {
  return (
    <div>
      <select
        className="classes_drop_down_menu"
        onChange={(e) => {
          setSelectedClass(e.target.value);
          setClassObjForEmail(classes.find((classObj) => classObj.name === e.target.value));
        }}
        onMouseDown={() => setSubmitAssignmentModalIsOpen(false)}
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
  classes: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSelectedClass: PropTypes.func.isRequired,
  setSubmitAssignmentModalIsOpen: PropTypes.func.isRequired,
  setClassObjForEmail: PropTypes.func.isRequired,
};

export default ClassesDropDownMenu;
