import React, { useState } from 'react';
import TaskCalendar from './Calendar';
import './task.css';

function Task() {
  return (
    <div className="task-container">
      <h1 className="tasks-header">
        Events & Tasks
        <button className="add-task" type="submit">Add Task</button>
      </h1>
      <TaskCalendar />
    </div>
  );
}

export default Task;
