import React from 'react';
import { TaskList } from './components/TaskList';
import { TaskForm } from './components/TaskForm';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

const queryClient = new QueryClient()

const Main = () => {
  return (
    <div>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList expanded={true}/>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;
