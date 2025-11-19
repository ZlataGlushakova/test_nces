import { useTaskStore } from './taskStore';
import { TaskStatus, TaskPriority } from '../../types/task';

// Basic selectors
export const useTasks = () => useTaskStore((state) => state.tasks);
export const useSelectedTask = () => useTaskStore((state) => state.selectedTask);
export const useTasksLoading = () => useTaskStore((state) => state.isLoading);
export const useTasksError = () => useTaskStore((state) => state.error);
export const useTaskFilters = () => useTaskStore((state) => state.filters);
export const useSortOption = () => useTaskStore((state) => state.sortOption);

// Derived selectors
export const useFilteredAndSortedTasks = () => {
  return useTaskStore((state) => {
    const { tasks, filters, sortOption } = state;
    
    let filteredTasks = tasks.filter(task => {
      // Filter by status
      if (filters.status && filters.status.length > 0 && !filters.status.includes(task.status)) {
        return false;
      }
      
      // Filter by priority
      if (filters.priority && filters.priority.length > 0 && !filters.priority.includes(task.priority)) {
        return false;
      }
      
      // Filter by tags
      if (filters.tags && filters.tags.length > 0 && !filters.tags.some(tag => task.tags.includes(tag))) {
        return false;
      }
      
      // Filter by search query
      if (filters.search) {
        const query = filters.search.toLowerCase();
        const matchesTitle = task.title.toLowerCase().includes(query);
        const matchesDescription = task.description.toLowerCase().includes(query);
        if (!matchesTitle && !matchesDescription) {
          return false;
        }
      }
      
      return true;
    });
    
    // Sort tasks
    filteredTasks = [...filteredTasks].sort((a, b) => {
      switch (sortOption) {
        case 'dueDate-asc':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'dueDate-desc':
          return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
        case 'priority-asc':
          const priorityOrder = { low: 0, medium: 1, high: 2 };
          return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
        case 'priority-desc':
          const priorityOrderDesc = { low: 0, medium: 1, high: 2 };
          return priorityOrderDesc[b.priority as keyof typeof priorityOrderDesc] - priorityOrderDesc[a.priority as keyof typeof priorityOrderDesc];
        case 'createdAt-asc':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'createdAt-desc':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });
    
    return filteredTasks;
  });
};

export const useTaskStats = () => {
  return useTaskStore((state) => {
    const tasks = state.tasks;
    const total = tasks.length;
    const todo = tasks.filter(task => task.status === 'todo').length;
    const inProgress = tasks.filter(task => task.status === 'inProgress').length;
    const done = tasks.filter(task => task.status === 'done').length;
    
    const overdue = tasks.filter(task => 
      task.status !== 'done' && new Date(task.dueDate) < new Date()
    ).length;
    
    const highPriority = tasks.filter(task => 
      task.priority === 'high' && task.status !== 'done'
    ).length;
    
    return {
      total,
      todo,
      inProgress,
      done,
      overdue,
      highPriority,
      completionRate: total > 0 ? (done / total) * 100 : 0,
    };
  });
};

export const useAllTags = () => {
  return useTaskStore((state) => {
    const allTags = new Set<string>();
    state.tasks.forEach(task => {
      task.tags.forEach(tag => allTags.add(tag));
    });
    return Array.from(allTags).sort();
  });
};

export const useTasksByStatus = (status: TaskStatus) => {
  return useTaskStore((state) => 
    state.tasks.filter(task => task.status === status)
  );
};

export const useTasksByPriority = (priority: TaskPriority) => {
  return useTaskStore((state) => 
    state.tasks.filter(task => task.priority === priority)
  );
};