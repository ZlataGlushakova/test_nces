import { Status, Priority, BaseEntity } from './common';

export type SortField = 'dueDate' | 'priority' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface ITask extends BaseEntity {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string; // ISO string
  tags: string[];
}

export interface CreateTaskDto {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  tags: string[];
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}

export interface TaskFilters {
  status?: Status[];
  priority?: Priority[];
  tags?: string[];
  search?: string;
}

export interface TaskSortOptions {
  field: 'dueDate' | 'priority' | 'createdAt';
  direction: 'asc' | 'desc';
}

