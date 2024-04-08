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

// To access state and methods inside this component,
// import { useUserData } from './path/to/UserDataProvider'
// then inside your component,
// const { userData } = useUserData();
