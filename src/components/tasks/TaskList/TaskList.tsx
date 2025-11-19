import React from 'react';
import { ITask } from '../../../types/task';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: ITask[];
  loading: boolean;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask?: (taskId: string, taskData: Partial<ITask>) => void; // Сделайте опциональным
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  loading, 
  onDeleteTask, 
}) => {
  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (tasks.length === 0) {
    return <div className={styles.empty}>Задачи не найдены</div>;
  }

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <div key={task.id} className={styles.taskItem}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => onDeleteTask(task.id)}>Удалить</button>
          {/* Добавьте остальную логику отображения */}
        </div>
      ))}
    </div>
  );
};