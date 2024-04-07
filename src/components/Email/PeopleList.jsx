import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PersonEmailCard from './PersonEmailCard';

// list out people in the class / faculty
function PeopleList({
  currentClass, potentialEmailees, receiverEmailList, setRecieverEmailList,
}) {
  const [isAllSelected, setIsAllSelected] = useState(false);

  const handleSelectAllChange = () => {
    const selected = isAllSelected;
    setIsAllSelected(!selected);
  };
  return (
    <div>
      <h2>{currentClass.name}</h2>
      <button type="button" onClick={handleSelectAllChange}>Select All</button>
      <ul>
        {potentialEmailees.map((person) => (
          <PersonEmailCard
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
