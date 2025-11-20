import React from 'react';
import { TaskPriority } from '../../../types/task';
import styles from './PriorityBadge.module.css';

interface PriorityBadgeProps {
  priority: TaskPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  const getPriorityConfig = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return { label: 'Высокий', className: styles.high };
      case 'medium':
        return { label: 'Средний', className: styles.medium };
      case 'low':
        return { label: 'Низкий', className: styles.low };
      default:
        return { label: 'Средний', className: styles.medium };
    }
  };

  const config = getPriorityConfig(priority);

  return (
    <span className={`${styles.badge} ${config.className}`}>
      {config.label}
    </span>
  );
};