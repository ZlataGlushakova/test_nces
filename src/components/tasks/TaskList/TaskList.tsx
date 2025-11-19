// 📁 src/components/tasks/TaskList/TaskList.tsx
import React from 'react';
import { ITask } from '../../../types/task';
import { TaskCard } from '../TaskCard';
import { EmptyState } from '../../common/EmptyState';
import { LoadingSpinner } from '../../common/LoadingSpinner';
import styles from './TaskList.module.css';

interface TaskListProps {
  tasks: ITask[];
  loading?: boolean;
  onEditTask: (task: ITask) => void;
  onDeleteTask: (taskId: string) => void;
  onStatusChange: (taskId: string, status: ITask['status']) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  loading = false,
  onEditTask,
  onDeleteTask,
  onStatusChange,
}) => {
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <LoadingSpinner />
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="No tasks found"
        message="Create your first task to get started!"
      />
    );
  }

  return (
    <div className={styles.taskList}>
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEditTask}
          onDelete={onDeleteTask}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};