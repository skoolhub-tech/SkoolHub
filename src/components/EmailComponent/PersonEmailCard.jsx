import React, { useState } from 'react';

function PersonEmailCard({ person, receiverEmailList, setRecieverEmailList}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <h2>{person.name}</h2>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

export default PersonEmailCard;
