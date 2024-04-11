import React from 'react';
import { useUserData } from './data-providers/UserDataProvider';
import Task from './Task_list/Task';
import Homepage from './Homepage/Homepage';

function HomepageWithTaskCheck() {
  const { userData } = useUserData();
  return userData.role === 1 ? <Task /> : <Homepage />;
}

export default HomepageWithTaskCheck;
