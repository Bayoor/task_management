import axiosClient from './axiosClient';
import type { Task, TaskFormData } from '@/types/task';

export const taskApi = {
  getTasks: async (): Promise<Task[]> => {
    const response = await axiosClient.get<Task[]>('/tasks');
    return response.data;
  },

  getTaskById: async (id: string): Promise<Task> => {
    const response = await axiosClient.get<Task>(`/tasks/${id}`);
    return response.data;
  },

  createTask: async (task: TaskFormData): Promise<Task> => {
    const newTask = {
      ...task,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const response = await axiosClient.post<Task>('/tasks', newTask);
    return response.data;
  },

  updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
    const updatedTask = {
      ...task,
      updatedAt: new Date().toISOString(),
    };
    const response = await axiosClient.patch<Task>(`/tasks/${id}`, updatedTask);
    return response.data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await axiosClient.delete(`/tasks/${id}`);
  },
};
