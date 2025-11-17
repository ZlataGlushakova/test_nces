import { httpClient } from '../utils';
import { ApiResponse, PaginatedResponse, QueryParams } from '../../types';

export abstract class BaseApi<T, CreateDto, UpdateDto> {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  async getAll(params?: QueryParams): Promise<ApiResponse<PaginatedResponse<T>>> {
    return httpClient.get<PaginatedResponse<T>>(this.endpoint, params);
  }

  async getById(id: string): Promise<ApiResponse<T>> {
    return httpClient.get<T>(`${this.endpoint}/${id}`);
  }

  async create(data: CreateDto): Promise<ApiResponse<T>> {
    return httpClient.post<T>(this.endpoint, data);
  }

  async update(id: string, data: UpdateDto): Promise<ApiResponse<T>> {
    return httpClient.put<T>(`${this.endpoint}/${id}`, data);
  }

  async partialUpdate(id: string, data: Partial<UpdateDto>): Promise<ApiResponse<T>> {
    return httpClient.patch<T>(`${this.endpoint}/${id}`, data);
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return httpClient.delete<void>(`${this.endpoint}/${id}`);
  }
}