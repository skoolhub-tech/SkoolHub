import React, { useState, useEffect } from 'react';
import { useUserData } from '../data-providers/UserDataProvider';
import EmailAdminView from './EmailAdminView';
import EmailTeachersView from './EmailTeachersView';
import EmailStudentsView from './EmailStudentsView';

// conditionally renders email component based on user role
function Email() {
  const { userData } = useUserData();
  const [userRole, setUserRole] = useState(userData.role);

  return (
    <>
      {userRole === 1 && <EmailAdminView />}
      {userRole === 2 && <EmailTeachersView />}
      {userRole === 3 && <EmailStudentsView />}
    </>
  );
}

export default Email;
