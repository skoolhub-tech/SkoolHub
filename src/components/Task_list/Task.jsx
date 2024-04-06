import React, { useState } from 'react';
import TaskCalendar from './Calendar';

function Task() {
  return (
    <div>
      <h1>Tasks</h1>
      <button className="add-task" type="submit">Add Task</button>
      <TaskCalendar />
    </div>
  );
}

export default Task;
