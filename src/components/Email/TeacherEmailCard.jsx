import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function TeacherEmailCard({
  person, receiverEmailList, setRecieverEmailList, isAllSelected,
}) {
  const [isChecked, setIsChecked] = useState(false);

  // add email to ReceiverEmailList or remove it based on check event
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
  // update isChecked and receiverEmailList when isAllSelected changes
  useEffect(() => {
    setIsChecked(isAllSelected);
    if (isAllSelected) {
      setRecieverEmailList((prevList) => ({ ...prevList, [person.email]: person }));
    } else {
      setRecieverEmailList((prevList) => {
        const updatedList = { ...prevList };
        delete updatedList[person.email];
        return updatedList;
      });
    }
  }, [isAllSelected]);

  return (
    <div className="personEmailCard">
      <label htmlFor={`checkbox-${person.email}`}>
        <span>{person.name}</span>
        <span>{person.class}</span>
        <input
          type="checkbox"
          id={`checkbox-${person.email}`}
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
}

TeacherEmailCard.propTypes = {
  person: PropTypes.object.isRequired,
  receiverEmailList: PropTypes.object.isRequired,
  setRecieverEmailList: PropTypes.func.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
};

export default TeacherEmailCard;