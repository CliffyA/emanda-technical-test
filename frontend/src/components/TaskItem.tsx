import React, { useState } from 'react';
import { Task } from '../types';
import { TaskForm } from './TaskForm';
import { TaskList } from './TaskList';

export const TaskItem: React.FC<{ task: Task }> = ({task, expanded, toggle}:{task:Task, expanded: boolean, toggle:(number)=>void}) => {
  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '0.75rem',
        margin: '0.5rem 0',
        backgroundColor: task.parentId ? '#f9f9f9' : '#fff',
        marginLeft: task.parentId ? '2rem' : '0',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <strong onClick={()=>toggle(task.id)}>{expanded ? "▼" : "▶" } {task.title}</strong>
          {expanded && <>
            <TaskForm parentTask={task}/>
            <TaskList parentId={task.id}/>
          </>}
        </div> 
      </div>
    </div>
  )
};