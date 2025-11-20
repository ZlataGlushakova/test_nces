import React, { useState } from 'react';
import { TaskFilters as ITaskFilters } from '../../../types/task';
import styles from './TaskFilters.module.css';

interface TaskFiltersProps {
  filters: ITaskFilters;
  onFiltersChange: (filters: ITaskFilters) => void;
  availableTags: string[];
  sortField?: any;
  sortOrder?: any;
  onSortChange?: any;
  onOrderChange?: any;
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTags,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = (status: string, checked: boolean) => {
    const currentStatuses = filters.status || [];
    const newStatuses = checked
      ? [...currentStatuses, status as any]
      : currentStatuses.filter(s => s !== status);
    
    onFiltersChange({
      ...filters,
      status: newStatuses.length > 0 ? newStatuses : undefined,
    });
  };

  const handlePriorityChange = (priority: string, checked: boolean) => {
    const currentPriorities = filters.priority || [];
    const newPriorities = checked
      ? [...currentPriorities, priority as any]
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

  const toggleFilters = () => {
    setIsExpanded(!isExpanded);
  };

  const hasActiveFilters = 
    (filters.status && filters.status.length > 0) ||
    (filters.priority && filters.priority.length > 0) ||
    (filters.tags && filters.tags.length > 0) ||
    !!filters.search;

  return (
    <div className={styles.filters}>
      <div className={styles.searchRow}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Найти задачу..."
            value={filters.search || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>
        <button 
          onClick={toggleFilters}
          className={styles.toggleButton}
        >
          {isExpanded ? 'Скрыть фильтры' : 'Показать фильтры'}
        </button>
      </div>

      {isExpanded && (
        <>
          <div className={styles.filterGroups}>
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Статус</label>
              <div className={styles.checkboxGroup}>
                {['todo', 'inProgress', 'done'].map(status => (
                  <label key={status} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filters.status?.includes(status as any) || false}
                      onChange={(e) => handleStatusChange(status, e.target.checked)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                      {status === 'todo' && 'К выполнению'}
                      {status === 'inProgress' && 'В процессе'}
                      {status === 'done' && 'Выполнено'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Приоритет</label>
              <div className={styles.checkboxGroup}>
                {['low', 'medium', 'high'].map(priority => (
                  <label key={priority} className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={filters.priority?.includes(priority as any) || false}
                      onChange={(e) => handlePriorityChange(priority, e.target.checked)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxText}>
                      {priority === 'low' && 'Низкий'}
                      {priority === 'medium' && 'Средний'}
                      {priority === 'high' && 'Высокий'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {availableTags.length > 0 && (
              <div className={styles.filterGroup}>
                <label className={styles.filterLabel}>Теги</label>
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
                Очистить фильтры
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};