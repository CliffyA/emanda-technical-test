import axios from 'axios';
import { Task } from './types';

const API_BASE = '/api/tasks';

export const fetchTasks = async (parentId?:number): Promise<Task[]> => {
  const res = await (parentId ? axios.get(API_BASE + "/" + parentId + "/subtasks") : axios.get(API_BASE));
  return Array.isArray(res.data) ? res.data : [];
};

export const createTask = async (title: string, parentId?: number): Promise<Task> => {
  try {
    const res = await axios.post(API_BASE, { title, parentId });
    return res.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error?.message ||
      'An unknown error occurred';
    throw new Error(message);
  }
};
