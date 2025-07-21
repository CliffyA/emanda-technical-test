import React, {useState, useCallback} from 'react';
import { TaskItem } from './TaskItem';
import { useTasks } from '../hooks/useTasks';
import { ErrorMessage } from './ErrorMessage';

export const TaskList: React.FC = ({parentId}:{parentId?:number}) => {
  const [expandedChildId, setExpandedChildId] = useState<number>(0);
  const childToggle = useCallback((childId:number) => setExpandedChildId(lastId => lastId === childId ? 0 : childId), [setExpandedChildId]);
  const query = useTasks(parentId);

  if (query.isPending) return 'Loading...';
  if (query.error) return <ErrorMessage message={'An error has occurred: ' + query.error.message} />;

  const tasks = query.data;
  return (
    <div>
      {!tasks?.length ? (
        <p>{parentId ? "No child tasks" : "No top-level tasks found."}</p>
      ) : (
        tasks.map((task) => <TaskItem key={task.id} task={task} expanded={expandedChildId == task.id} toggle={childToggle}/>)
      )}
    </div>
  );
};