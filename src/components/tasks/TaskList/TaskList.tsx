import React from 'react';
import { ITask } from '../../../types/task';
import { TaskCard } from '../TaskCard';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: ITask[];
  loading: boolean;
  onDeleteTask: (taskId: string) => void;
  onUpdateTask: (taskId: string, taskData: Partial<ITask>) => void;
  onEditTask: (task: ITask) => void; // Добавить обработчик редактирования
}

export const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  loading, 
  onDeleteTask,
  onUpdateTask,
  onEditTask,
}) => {
  if (loading) {
    return <div className={styles.loading}>Загрузка...</div>;
  }

  if (tasks.length === 0) {
    return <div className={styles.empty}>Задачи не найдены</div>;
  }

  const handleStatusChange = (taskId: string, status: ITask['status']) => {
    onUpdateTask(taskId, { status });
  };

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onStatusChange={handleStatusChange}
        />
      ))}
    </div>
  );
};