import React, { useState } from 'react';
import TaskCalendar from './Calendar';
import './task.css';

function Task() {
  return (
    <div className="task-container">
      <h1 className="tasks-header">
        Events & Tasks
      </h1>
      <div className="calendar-container">
        <TaskCalendar defaultView="month" views={['month', 'week', 'day', 'agenda']} />
      </div>
    </div>
  );
}

export default Task;
