import React from 'react';
import { ITask } from '../../../types/task';
import { PriorityBadge } from '../PriorityBadge';
import styles from './TaskCard.module.css';

interface TaskCardProps {
  task: ITask;
  onEdit: (task: ITask) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: ITask['status']) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(task.id, e.target.value as ITask['status']);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>
      
      <p className={styles.description}>{task.description}</p>
      
      <div className={styles.meta}>
        <div className={styles.status}>
          <label>Status:</label>
          <select 
            value={task.status} 
            onChange={handleStatusChange}
            className={styles.statusSelect}
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div className={styles.dueDate}>
          <span>Due: {formatDate(task.dueDate)}</span>
        </div>
      </div>

      {task.tags.length > 0 && (
        <div className={styles.tags}>
          {task.tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>
      )}

      <div className={styles.actions}>
        <button 
          className={styles.editButton}
          onClick={() => onEdit(task)}
        >
          Edit
        </button>
        <button 
          className={styles.deleteButton}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};