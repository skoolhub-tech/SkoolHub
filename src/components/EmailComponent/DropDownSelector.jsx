import React from 'react';

function DropDown({ classes, currentClass, handleClassChange }) {

  return (
    <select
      value={currentClass}
      onChange={(e) => handleClassChange(e.target.value)}
    >
      <option value="">Select a class</option>
      {classes.map((classObj) => (
        <option key={classObj.id} value={classObj.id}>{classObj.name}</option>
      ))}
    </select>
  );
}

export default DropDown;
