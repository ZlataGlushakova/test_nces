import React from 'react';
import { TaskFilters as ITaskFilters } from '../../../types/task';
import styles from './TaskFilters.module.css';

interface TaskFiltersProps {
  filters: ITaskFilters;
  onFiltersChange: (filters: ITaskFilters) => void;
  availableTags: string[];
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTags,
}) => {
  const handleStatusChange = (status: ITaskFilters['status'][0], checked: boolean) => {
    const currentStatuses = filters.status || [];
    const newStatuses = checked
      ? [...currentStatuses, status]
      : currentStatuses.filter(s => s !== status);
    
    onFiltersChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const handlePriorityChange = (priority: ITaskFilters['priority'][0], checked: boolean) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = checked
      ? [...currentPriorities, priority]
      : currentPriorities.filter(p => p !== priority);
    
    onFiltersChange({
      ...filters,
      priority: newPriorities.length > 0 ? newPriorities : undefined,
    });
  };

  const handleTagChange = (tag: string, checked: boolean) => {
    const currentTags = filters.tags || [];
    const newTags = checked
      ? [...currentTags, tag]
      : currentTags.filter(t => t !== tag);
    
    onFiltersChange({
      ...filters,
      tags: newTags.length > 0 ? newTags : undefined,
    });
  };

  const handleSearchChange = (search: string) => {
    onFiltersChange({
      ...filters,
      search: search || undefined,
    });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = 
    (filters.status && filters.status.length > 0) ||
    (filters.priority && filters.priority.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    !!filters.search;

  return (
    <div className={styles.filters}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search || ''}
          onChange={(e) => handleSearchChange(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <div className={styles.filterGroups}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Status</label>
          <div className={styles.checkboxGroup}>
            {['todo', 'inProgress', 'done'].map(status => (
              <label key={status} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={filters.status?.includes(status as any) || false}
                  onChange={(e) => handleStatusChange(status as any, e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  {status === 'todo' && 'To Do'}
                  {status === 'inProgress' && 'In Progress'}
                  {status === 'done' && 'Done'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Priority</label>
          <div className={styles.checkboxGroup}>
            {['low', 'medium', 'high'].map(priority => (
              <label key={priority} className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={filters.priority?.includes(priority as any) || false}
                  onChange={(e) => handlePriorityChange(priority as any, e.target.checked)}
                  className={styles.checkbox}
                />
                <span className={styles.checkboxText}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)}
                </span>
              </label>
            ))}
          </div>
        </div>

        {availableTags.length > 0 && (
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Tags</label>
            <div className={styles.checkboxGroup}>
              {availableTags.map(tag => (
                <label key={tag} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={filters.tags?.includes(tag) || false}
                    onChange={(e) => handleTagChange(tag, e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span className={styles.checkboxText}>{tag}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {hasActiveFilters && (
        <div className={styles.clearSection}>
          <button onClick={clearFilters} className={styles.clearButton}>
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};