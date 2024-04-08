import React from 'react';
import AssignStudentClass from './AssignStudentClass';
import { useUserData } from '../data-providers/UserDataProvider';

function Admin() {
  const { userData } = useUserData();
  return (
    <div>
      {/* Your code here */}
      <button type="button"> Users</button>
      <button type="button"> Classes</button>
      <AssignStudentClass />

    </div>
  );
}

export default Admin;
