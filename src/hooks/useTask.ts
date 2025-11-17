import { useState, useEffect } from 'react';
import { taskApi } from '../services/api';
import { ITask } from '../types';

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        const response = await taskApi.getById(taskId);
        setTask(response.data);
      } catch (err: any) {
        setError(err.message || 'Ошибка загрузки задачи');
      } finally {
        setLoading(false);
      }
    };

    if (taskId) {
      fetchTask();
    }
  }, [taskId]);

  const deleteTask = async () => {
    try {
      await taskApi.delete(taskId);
    } catch (err: any) {
      setError(err.message || 'Ошибка удаления задачи');
      throw err;
    }
  };

  return {
    task,
    loading,
    error,
    deleteTask,
  };
};