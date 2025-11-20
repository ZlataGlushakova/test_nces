// pages/TaskFormPage/TaskFormPage.tsx
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TaskForm } from '../../components/tasks/TaskForm';
import { useTasks } from '../../hooks/useTasks';
import { useTask } from '../../hooks/useTask';
import styles from './TaskFormPage.module.css';

export const TaskFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();
  const { createTask, tasks, updateTask } = useTasks();
  const { task: editingTask, loading } = useTask(taskId || '');

  const isEditing = !!taskId;

  // Получаем уникальные теги из существующих задач
  const existingTags = React.useMemo(() => {
    const allTags = tasks.flatMap(task => task.tags || []);
    return Array.from(new Set(allTags));
  }, [tasks]);

  const handleSubmit = async (taskData: any) => {
    try {
      if (isEditing && taskId) {
        await updateTask(taskId, taskData);
      } else {
        await createTask(taskData);
      }
      navigate('/tasks');
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleCancel = () => {
    navigate('/tasks');
  };

  if (isEditing && loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{isEditing ? 'Редактировать задачу' : 'Создать новую задачу'}</h1>
      </div>
      <TaskForm 
        task={editingTask || undefined}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        existingTags={existingTags}
      />
    </div>
  );
};