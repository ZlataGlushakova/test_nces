import { useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import { ITask } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskApi.getAll();
      setTasks(response.data.data || response.data);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки задач');
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskApi.delete(taskId);
      setTasks(prev => prev.filter(task => task.id !== taskId));
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления задачи');
      throw err;
    }
  };

  const updateTask = async (taskId: string, updates: Partial<ITask>) => {
    try {
      const response = await taskApi.update(taskId, updates);
      setTasks(prev => prev.map(task => 
        task.id === taskId ? { ...task, ...response.data } : task
      ));
    } catch (err: any) {
      setError(err.message || 'Ошибка обновления задачи');
      throw err;
    }
  };

  return {
    tasks,
    loading,
    error,
    deleteTask,
    updateTask,
    refetch: fetchTasks,
  };
};