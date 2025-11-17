export type Status = 'todo' | 'inProgress' | 'done';
export type Priority = 'low' | 'medium' | 'high';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}