import React, { useState } from 'react';

function PersonEmailCard({ person, receiverEmailList, setRecieverEmailList}) {
  const [isChecked, setIsChecked] = useState(false);

  // update the receiverEmailList when the checkbox is checked
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    if (event.target.checked) {
      setRecieverEmailList({ ...receiverEmailList, [person.email]: person });
    } else {
      const updatedList = { ...receiverEmailList };
      delete updatedList[person.email];
      setRecieverEmailList(updatedList);
    }
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
