import { BaseApi } from './baseApi';
import { 
  ITask, 
  CreateTaskDto, 
  UpdateTaskDto, 
  TaskFilters, 
  TaskSortOptions 
} from '../../types';

export class TaskApi extends BaseApi<ITask, CreateTaskDto, UpdateTaskDto> {
  constructor() {
    super('/tasks');
  }

  async getTasksWithFilters(
    filters: TaskFilters,
    sort: TaskSortOptions,
    page: number = 1,
    limit: number = 10
  ) {
    const params: Record<string, any> = {
      page,
      limit,
      sortBy: sort.field,
      sortOrder: sort.direction,
      ...filters,
    };

    // Remove undefined values
    Object.keys(params).forEach((key: string) => {
      if (params[key] === undefined || params[key] === '') {
        delete params[key];
      }
    });

    return this.getAll(params);
  }

  async updateStatus(id: string, status: ITask['status']) {
    return this.partialUpdate(id, { status });
  }

  async updatePriority(id: string, priority: ITask['priority']) {
    return this.partialUpdate(id, { priority });
  }

  async addTag(id: string, tag: string) {
    const task = await this.getById(id);
    const currentTags = task.data.tags || [];
    const updatedTags = [...currentTags, tag];
    
    return this.partialUpdate(id, { tags: updatedTags });
  }

  async removeTag(id: string, tag: string) {
    const task = await this.getById(id);
    const currentTags = task.data.tags || [];
    const updatedTags = currentTags.filter((t: string) => t !== tag);
    
    return this.partialUpdate(id, { tags: updatedTags });
  }

  async getTasksByTag(tag: string) {
    return this.getAll({ tags: [tag] });
  }

  async searchTasks(query: string) {
    return this.getAll({ search: query });
  }
}

export const taskApi = new TaskApi();