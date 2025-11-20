import React, { useState, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { TaskFilters, SortField, SortOrder, ITask } from '../../types/task'; 
import { TaskList } from '../../components/tasks/TaskList';
import { TaskFilters as Filters } from '../../components/tasks/TaskFilters';
import { useTasks } from '../../hooks/useTasks';
import styles from './TaskListPage.module.css';

export const TaskListPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { tasks, loading, error, deleteTask, updateTask } = useTasks();
  
  const [filters, setFilters] = useState<TaskFilters>({
    status: searchParams.get('status')?.split(',') as TaskFilters['status'],
    priority: searchParams.get('priority')?.split(',') as TaskFilters['priority'],
    tags: searchParams.get('tags')?.split(','),
    search: searchParams.get('search') || '',
  });

  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Получаем уникальные теги из всех задач
  const availableTags = useMemo(() => {
    const allTags = tasks.flatMap(task => task.tags || []);
    return Array.from(new Set(allTags));
  }, [tasks]);

  const filteredAndSortedTasks = useMemo(() => {
    let filtered = tasks.filter((task) => {
      // Фильтрация по статусу
      if (filters.status && filters.status.length > 0 && !filters.status.includes(task.status)) {
        return false;
      }
      // Фильтрация по приоритету
      if (filters.priority && filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
        return false;
      }
      // Фильтрация по тегам
      if (filters.tags && filters.tags.length > 0 && !filters.tags.some((tag: string) => task.tags.includes(tag))) {
        return false;
      }
      // Фильтрация по поиску
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        return (
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
        );
      }
      return true;
    });

    // Сортировка
    filtered.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'dueDate' || sortField === 'createdAt') {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (sortField === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        aValue = priorityOrder[aValue as keyof typeof priorityOrder];
        bValue = priorityOrder[bValue as keyof typeof priorityOrder];
      }

      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    });

    return filtered; // Возвращаем отфильтрованный и отсортированный массив
  }, [tasks, filters, sortField, sortOrder]);

  const handleFiltersChange = (newFilters: TaskFilters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && (value as any).length > 0) {
        params.set(key, Array.isArray(value) ? value.join(',') : value);
      }
    });
    setSearchParams(params);
  };

  const handleEditTask = (task: ITask) => {
    navigate(`/tasks/edit/${task.id}`);
  };

  if (error) {
    return <div className={styles.error}>Ошибка загрузки задач: {error}</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Все задачи</h1>
        <Link to="/tasks/new" className={styles.createButton}>
          Создать задачу
        </Link>
      </div>

      <Filters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        availableTags={availableTags}
        sortField={sortField}
        sortOrder={sortOrder}
        onSortChange={setSortField}
        onOrderChange={setSortOrder}
      />

      <TaskList
        tasks={filteredAndSortedTasks}
        loading={loading}
        onDeleteTask={deleteTask}
        onUpdateTask={updateTask}
        onEditTask={handleEditTask}
      />
    </div>
  );
};