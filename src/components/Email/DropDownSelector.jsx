import React from 'react';

function DropDown({ classes, handleClassChange }) {
  const handleChange = (e) => {
    const selectedClass = classes.find((classObj) => classObj.id === Number(e.target.value));
    handleClassChange(selectedClass);
  };
  return (
    <select
      onChange={handleChange}
    >
      <option value="">Select a Class</option>
      {classes.map((classObj) => (
        <option key={classObj.name} value={classObj.id}>{classObj.name}</option>
      ))}
    </select>
  );
}

export default DropDown;
