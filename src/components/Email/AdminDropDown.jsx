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
      <option value="" disabled>Select Group</option>
      {views.map((view) => (
        <option key={view} value={view}>{view}</option>
      ))}
    </select>
  );
}

export default AdminDropDown;
