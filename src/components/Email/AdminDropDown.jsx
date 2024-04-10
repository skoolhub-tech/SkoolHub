import React, { useState } from 'react';
import PropTypes from 'prop-types';

function AdminDropDown({ views, handleDropdownChange }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
    handleDropdownChange(e.target.value);
  };

  return (
    <select value={selectedValue} onChange={handleChange} className="emailDropdown">
      {views.map((view) => (
        <option key={view} value={view}>{view}</option>
      ))}
    </select>
  );
}

AdminDropDown.propTypes = {
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDropdownChange: PropTypes.func.isRequired,
};

export default AdminDropDown;
