import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PersonEmailCard from './PersonEmailCard';
import { useUserData } from '../data-providers/UserDataProvider';

// list out people in the given potentialEmailees list
function PeopleList({
  currentClass,
  potentialEmailees,
  receiverEmailList,
  setRecieverEmailList,
  setEmailModal,
  setOpenThreshold,
}) {
  const [isAllSelected, setIsAllSelected] = useState(false);
  const { userData } = useUserData();
  const handleSelectAllChange = () => {
    const selected = isAllSelected;
    setIsAllSelected(!selected);
  };
  return (
    <div className="peopleListView">
      <h2>{currentClass.name}</h2>
      <div className="peopleListBtns">
        <button type="button" onClick={handleSelectAllChange}>{isAllSelected ? 'Deselect All' : 'Select All'}</button>
        {userData.role === 2 && currentClass.name !== 'Faculty' && (
          <button type="button" onClick={() => setOpenThreshold(true)}>Threshold</button>
        )}
        <button type="button" onClick={() => setEmailModal(true)}>Draft Email</button>
      </div>
      <div className="personCardContainer">
        {potentialEmailees.map((person) => (
          <PersonEmailCard
            key={person.email}
            person={person}
            receiverEmailList={receiverEmailList}
            setRecieverEmailList={setRecieverEmailList}
            isAllSelected={isAllSelected}
          />
        ))}
      </div>
    </div>
  );
}

PeopleList.propTypes = {
  currentClass: PropTypes.shape({}).isRequired,
  potentialEmailees: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  receiverEmailList: PropTypes.shape({}).isRequired,
  setRecieverEmailList: PropTypes.func.isRequired,
  setEmailModal: PropTypes.func.isRequired,
  setOpenThreshold: PropTypes.func,
};

PeopleList.defaultProps = {
  setOpenThreshold: () => {},
};

export default PeopleList;
