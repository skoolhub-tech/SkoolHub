import React from 'react';
import { useUserData } from './data-providers/UserDataProvider';

function SwitchUser() {
  const { userData, setUserData } = useUserData();
  const { role } = userData;

  const swap = () => {
    let newUser;
    if (role === 1) {
      newUser = {
        role: 2,
        name: 'Duck',
        email: 'stevenn.kkim@gmail.com',
        id: 1,
      };
    } else if (role === 2) {
      newUser = {
        role: 3,
        name: 'John Smith',
        email: 'john.smith@gmail.com',
        id: 1,
      };
    } else if (role === 3) {
      newUser = {
        role: 1,
        name: 'John Smith',
        email: 'jsmith@gmail.com',
        id: 1,
      };
    }
    localStorage.setItem('email', newUser.email);
    setUserData(newUser);
    window.location.href = '/homepage';
  };

  return (
    <button className="switch-bttn" type="button" onClick={swap}>Switch</button>
  );
}

export default SwitchUser;
