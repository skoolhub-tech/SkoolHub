import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PersonEmailCard from './PersonEmailCard';
import TeacherEmailCard from './TeacherEmailCard';
import { useUserData } from '../data-providers/UserDataProvider';

// list out people in the class / faculty
function PeopleList({
  currentClass, potentialEmailees, receiverEmailList, setRecieverEmailList, setEmailModal,
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
        <button type="button" onClick={handleSelectAllChange}>Select All</button>
        <button type="button" onClick={() => setEmailModal(true)}>Draft Email</button>
      </div>
      <ul className="personCardContainer">
        {userData.role === 2 && potentialEmailees.map((person) => (
          <PersonEmailCard
            key={person.email}
            person={person}
            receiverEmailList={receiverEmailList}
            setRecieverEmailList={setRecieverEmailList}
            isAllSelected={isAllSelected}
          />
        ))}
        {userData.role === 3 && potentialEmailees.map((person) => (
          <TeacherEmailCard
            key={person.email}
            person={person}
            receiverEmailList={receiverEmailList}
            setRecieverEmailList={setRecieverEmailList}
            isAllSelected={isAllSelected}
          />
        ))}
      </ul>
    </div>
  );
}

PeopleList.propTypes = {
  currentClass: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  potentialEmailees: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })),
  receiverEmailList: PropTypes.objectOf(PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  })),
  setRecieverEmailList: PropTypes.func.isRequired,
};

PeopleList.defaultProps = {
  potentialEmailees: [],
};

PeopleList.defaultProps = {
  currentClass: {},
};

PeopleList.defaultProps = {
  receiverEmailList: {},
};

export default PeopleList;
