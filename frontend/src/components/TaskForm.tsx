import React, { useState, useCallback } from 'react';
import { Task } from '../types';
import { useCreateTask } from '../hooks/useCreateTask';
import { ErrorMessage } from './ErrorMessage';

export const TaskForm: React.FC<{ parentTask: Task }> = ({ parentTask }) => {
  const [title, setTitle] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>(undefined);
  const mutation = useCreateTask();
  
  const onSubmit = useCallback(async () => {
    try
    {
      setErrorMessage("");
      await mutation.mutateAsync({title, parentId: parentTask?.id});
      setTitle("");
    }
    catch (error)
    {
      setErrorMessage(error?.message || "An unexpected error has occoured");
    }
  }, [mutation, title, parentTask?.id, setErrorMessage]);

  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="New Task" disabled={mutation.isPending} />
      <button onClick={onSubmit} disabled={mutation.isPending}>{parentTask ? "Add SubTask" : "Add Task"}</button>
      {!!errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
};