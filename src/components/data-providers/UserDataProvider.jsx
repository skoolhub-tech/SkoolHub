import React from 'react';
import PropTypes from 'prop-types';

const Context = React.createContext();
const { useState, useContext, useMemo } = React;

// Data provider component
export function UserDataProvider({ children }) {
  const [userData, setUserData] = useState({ role: 2, email: 'jane.doe@hotmail.com' });
  const userState = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData],
  );
  // Returns wrapper component for all components
  // Pass state and methods to value prop for access in other components
  return (
    <Context.Provider value={userState}>
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
