// src/hooks/useTask.ts
import { useState, useEffect } from 'react';
import { ITask } from '../types/task';
import { taskApi } from '../services/api/taskApi';

export const useTask = (taskId: string) => {
  const [task, setTask] = useState<ITask | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);
        setError(null);
        const taskData = await taskApi.getTaskById(taskId);
        setTask(taskData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load task');
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
      await taskApi.deleteTask(taskId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
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