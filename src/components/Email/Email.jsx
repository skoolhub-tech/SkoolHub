import React from 'react';
import { useUserData } from '../data-providers/UserDataProvider';
import EmailAdminView from './EmailAdminView';
import EmailTeachersView from './EmailTeachersView';
import EmailStudentsView from './EmailStudentsView';

// conditionally renders email component based on user role
function Email() {
  const { userData } = useUserData();

  return (
    <>
      {userData.role === 1 && <EmailAdminView />}
      {userData.role === 2 && <EmailTeachersView />}
      {userData.role === 3 && <EmailStudentsView />}
    </>
  );
}

export default Email;
