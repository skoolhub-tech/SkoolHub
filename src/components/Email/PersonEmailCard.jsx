import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function PersonEmailCard({
  person, receiverEmailList, setRecieverEmailList, isAllSelected,
}) {
  const [isChecked, setIsChecked] = useState(false);
  // add email to ReceiverEmailList or remove it based on check event
  const handleRowClick = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
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
    <tr className={`personEmailCard ${isChecked ? 'selectedRow' : ''}`} onClick={handleRowClick}>
      <td className="td-name">
        {person.name}
        {Array.isArray(person.class) ? 'Teacher' : person.class}
      </td>
    </tr>
  );
}

PersonEmailCard.propTypes = {
  person: PropTypes.object.isRequired,
  receiverEmailList: PropTypes.object.isRequired,
  setRecieverEmailList: PropTypes.func.isRequired,
  isAllSelected: PropTypes.bool.isRequired,
};

export default PersonEmailCard;
