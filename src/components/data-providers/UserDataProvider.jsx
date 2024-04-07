import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const Context = React.createContext();
const {
  useState,
  useContext,
  useMemo,
  useEffect,
} = React;

// Data provider component
export function UserDataProvider({ children, isLoggedIn, email }) {
  const [userData, setUserData] = useState({ role: null, email: null });
  const userState = useMemo(
    () => ({ userData, setUserData }),
    [userData, setUserData],
  );

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('')
        .then((response) => setUserData({
          role: response.data,
          email,
        }))
        .catch((error) => console.error({
          Message: 'Error retrieving user role.',
          Error: error,
        }));
    }
  }, [isLoggedIn]);
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
  isLoggedIn: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
};

export const useUserData = () => useContext(Context);

// To access state and methods inside this component,
// import { useUserData } from './path/to/UserDataProvider'
// then inside your component,
// const { userData } = useUserData();
