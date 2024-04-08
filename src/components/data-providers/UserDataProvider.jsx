/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Context = React.createContext();
const {
  useState,
  useContext,
  useEffect,
} = React;

// Data provider component
export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState({
    role: null,
    name: null,
    email: null,
    id: null,
  });

  useEffect(() => {
    if (userData.email && !userData.name) {
      axios.get(`/skoolhub/login/role/${userData.email}`)
        .then((response) => {
          const { role_id, name, id } = response.data[0];
          setUserData({
            ...userData,
            role: role_id,
            name,
            id,
          });
        })
        .catch((error) => console.error({
          Message: 'Error retrieving role.',
          Error: error,
        }));
    }
  }, [userData.email]);
  // Returns wrapper component for all components
  // Pass state and methods to value prop for access in other components
  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <Context.Provider value={{ userData, setUserData }}>
      {children}
    </Context.Provider>
  );
}

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUserData = () => useContext(Context);

// TO ACCESS STATE AND METHODS FROM THIS COMPONENT,
// ------------------------------------------------
// import { useUserData } from './path/to/UserDataProvider'
// then inside your component,
// const { userData } = useUserData();

// TO SKIP LOGIN AND HAVE USER DATA:
// --------------------------------
// REMINDER: DO NOT COMMIT CHANGES TO THIS FILE
// 1. Set isLoggedIn default value to 'true' in App.jsx, line 15
// 1. Comment out useEffect on lines 22-39
// 2. Add hard-coded data in lines 16-19 above
//    a. For student:
//        role: 3,
//        name: 'John Smith'
//        email:'john.smith@gmail.com'
//        id: 1,
//    b. For teacher:
//        role: 2,
//        name: 'John Doe'
//        email:'john.doe@aol.com'
//        id: 1,
//    c. For admin:
//        role: 1,
//        name: 'John Smith'
//        email:'jsmith@gmail.com'
//        id: 1,

// TO LOG IN WITH SEED DATA:
// 1. Ensure that default state for userData values are all null.
// 2. Ensure the useEffect is not commented out
// 3. in Login.jsx - change the email on line 96 to your email
// 4. Find seed data in seed.js, and enter email/password for the first
//    or second teacher/student/admin in their respective lists of data.
