import React, { useState } from 'react';
import PropTypes from 'prop-types';

function DropDown({ classes, handleClassChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    if (e.target.value === 'Faculty') {
      handleClassChange(e.target.value);
      return;
    }
    const selectedClass = classes.find((classObj) => classObj.id === Number(e.target.value));
    if (selectedClass) {
      handleClassChange(selectedClass);
    }
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="" disabled>Select a Class</option>
      <option key="Faculty" value="Faculty">Faculty</option>
      {classes.map((classObj) => (
        <option key={classObj.name} value={classObj.id}>{classObj.name}</option>
      ))}
    </select>
  );
}

DropDown.propTypes = {
  handleClassChange: PropTypes.func.isRequired,
};

export default DropDown;
