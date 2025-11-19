import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ITask, TaskFilters, SortOption } from '../../types/task';
import { taskApi } from '../../services/api/taskApi';

interface TaskState {
  tasks: ITask[];
  selectedTask: ITask | null;
  isLoading: boolean;
  error: string | null;
  filters: TaskFilters;
  sortOption: SortOption;
  
  setTasks: (tasks: ITask[]) => void;
  setSelectedTask: (task: ITask | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setFilters: (filters: TaskFilters) => void;
  setSortOption: (sortOption: SortOption) => void;
  
  fetchTasks: () => Promise<void>;
  fetchTaskById: (id: string) => Promise<void>;
  createTask: (taskData: Omit<ITask, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTask: (id: string, taskData: Partial<ITask>) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  
  clearError: () => void;
  clearSelectedTask: () => void;
  resetFilters: () => void;
}

const initialFilters: TaskFilters = {
  status: [],
  priority: [],
  tags: [],
  search: '',
};

export const useTaskStore = create<TaskState>()(
  devtools(
    (set) => ({
      tasks: [],
      selectedTask: null,
      isLoading: false,
      error: null,
      filters: initialFilters,
      sortOption: 'createdAt-desc',
      
      setTasks: (tasks) => set({ tasks }),
      setSelectedTask: (selectedTask) => set({ selectedTask }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      setFilters: (filters) => set({ filters }),
      setSortOption: (sortOption) => set({ sortOption }),
      
      fetchTasks: async () => {
        set({ isLoading: true, error: null });
        try {
          const tasks = await taskApi.getTasks();
          set({ tasks, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch tasks',
            isLoading: false 
          });
        }
      },
      
      fetchTaskById: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const task = await taskApi.getTaskById(id);
          set({ selectedTask: task, isLoading: false });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch task',
            isLoading: false 
          });
        }
      },
      
      createTask: async (taskData) => {
        set({ isLoading: true, error: null });
        try {
          const newTask = await taskApi.createTask(taskData);
          set((state) => ({ 
            tasks: [newTask, ...state.tasks],
            isLoading: false 
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to create task',
            isLoading: false 
          });
        }
      },
      
      updateTask: async (id: string, taskData) => {
        set({ isLoading: true, error: null });
        try {
          const updatedTask = await taskApi.updateTask(id, taskData);
          set((state) => ({
            tasks: state.tasks.map(task => 
              task.id === id ? updatedTask : task
            ),
            selectedTask: state.selectedTask?.id === id ? updatedTask : state.selectedTask,
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to update task',
            isLoading: false 
          });
        }
      },
      
      deleteTask: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          await taskApi.deleteTask(id);
          set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id),
            selectedTask: state.selectedTask?.id === id ? null : state.selectedTask,
            isLoading: false
          }));
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to delete task',
            isLoading: false 
          });
        }
      },
      
      clearError: () => set({ error: null }),
      clearSelectedTask: () => set({ selectedTask: null }),
      resetFilters: () => set({ filters: initialFilters }),
    }),
    {
      name: 'task-store',
    }
  )
);