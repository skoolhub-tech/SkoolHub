import React from 'react';
import PersonEmailCard from './PersonEmailCard';

function PeopleList({ potentialEmailees, receiverEmailList, setRecieverEmailList }) {
  return (
    <div>
      <h2>{currentClass}</h2>
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
