import React from 'react';
import PersonEmailCard from './PersonEmailCard';

// list out people in the class / faculty
function PeopleList({ currentClass, potentialEmailees, receiverEmailList, setRecieverEmailList }) {
  return (
    <div>
      <h2>{currentClass.name}</h2>
      <ul>
        {potentialEmailees.map((person) => (
          <PersonEmailCard
            key={person.email}
            person={person}
            receiverEmailList={receiverEmailList}
            setRecieverEmailList={setRecieverEmailList}
          />
        ))}
      </ul>
    </div>
  );
}

export default PeopleList;
