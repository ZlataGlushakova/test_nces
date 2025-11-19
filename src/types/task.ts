export type SortField = 'dueDate' | 'priority' | 'createdAt';
export type SortOrder = 'asc' | 'desc';
export type SortOption = `${SortField}-${SortOrder}`;

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'inProgress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'todo' | 'inProgress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface TaskFilters {
  status?: TaskStatus[];
  priority?: TaskPriority[];
  tags?: string[];
  search?: string;
  searchQuery?: string; // Добавьте для обратной совместимости
}

export interface TaskSortOptions {
  field: SortField;
  direction: SortOrder;
}

// DTOs для API
export interface CreateTaskDto {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}