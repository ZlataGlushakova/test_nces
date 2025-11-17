import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { ITask, CreateTaskDto, UpdateTaskDto, TaskFilters, TaskSortOptions } from '../../types';
import { taskApi } from '../../services/api';

interface TasksState {
  tasks: ITask[];
  loading: boolean;
  error: string | null;
  filters: TaskFilters;
  sort: TaskSortOptions;
}

type TasksAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_TASKS'; payload: ITask[] }
  | { type: 'ADD_TASK'; payload: ITask }
  | { type: 'UPDATE_TASK'; payload: ITask }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'SET_FILTERS'; payload: TaskFilters }
  | { type: 'SET_SORT'; payload: TaskSortOptions };

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
  filters: {},
  sort: { field: 'createdAt', direction: 'desc' },
};

const tasksReducer = (state: TasksState, action: TasksAction): TasksState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_TASKS':
      return { ...state, tasks: action.payload, loading: false };
    case 'ADD_TASK':
      return { ...state, tasks: [action.payload, ...state.tasks] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_SORT':
      return { ...state, sort: action.payload };
    default:
      return state;
  }
};

interface TasksContextType extends TasksState {
  fetchTasks: () => Promise<void>;
  createTask: (taskData: CreateTaskDto) => Promise<void>;
  updateTask: (id: string, taskData: UpdateTaskDto) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  updateTaskStatus: (id: string, status: ITask['status']) => Promise<void>;
  setFilters: (filters: TaskFilters) => void;
  setSort: (sort: TaskSortOptions) => void;
  clearError: () => void;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialState);

  const fetchTasks = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await taskApi.getTasksWithFilters(
        state.filters,
        state.sort,
        1,
        50
      );
      dispatch({ type: 'SET_TASKS', payload: response.data.data });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to fetch tasks',
      });
    }
  };

  const createTask = async (taskData: CreateTaskDto) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await taskApi.create(taskData);
      dispatch({ type: 'ADD_TASK', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to create task',
      });
      throw error;
    }
  };

  const updateTask = async (id: string, taskData: UpdateTaskDto) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const response = await taskApi.update(id, taskData);
      dispatch({ type: 'UPDATE_TASK', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to update task',
      });
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      await taskApi.delete(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to delete task',
      });
      throw error;
    }
  };

  const updateTaskStatus = async (id: string, status: ITask['status']) => {
    try {
      const response = await taskApi.updateStatus(id, status);
      dispatch({ type: 'UPDATE_TASK', payload: response.data });
    } catch (error) {
      dispatch({
        type: 'SET_ERROR',
        payload: error instanceof Error ? error.message : 'Failed to update task status',
      });
      throw error;
    }
  };

  const setFilters = (filters: TaskFilters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  };

  const setSort = (sort: TaskSortOptions) => {
    dispatch({ type: 'SET_SORT', payload: sort });
  };

  const clearError = () => {
    dispatch({ type: 'SET_ERROR', payload: null });
  };

  const value: TasksContextType = {
    ...state,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    setFilters,
    setSort,
    clearError,
  };

  return (
    <TasksContext.Provider value={value}>
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
};