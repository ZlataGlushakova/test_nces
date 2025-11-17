export class LocalStorageService {
  private static instance: LocalStorageService;

  private constructor() {}

  static getInstance(): LocalStorageService {
    if (!LocalStorageService.instance) {
      LocalStorageService.instance = new LocalStorageService();
    }
    return LocalStorageService.instance;
  }

  set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | undefined {
    try {
      const item = localStorage.getItem(key);
      if (item === null) {
        return defaultValue;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage key "${key}":`, error);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }

  // Task-specific methods
  private readonly TASKS_FILTERS_KEY = 'tasks_filters';
  private readonly TASKS_SORT_KEY = 'tasks_sort';
  private readonly TASKS_VIEW_KEY = 'tasks_view';

  getFilters() {
    return this.get(this.TASKS_FILTERS_KEY);
  }

  setFilters(filters: any) {
    this.set(this.TASKS_FILTERS_KEY, filters);
  }

  getSortOptions() {
    return this.get(this.TASKS_SORT_KEY);
  }

  setSortOptions(sortOptions: any) {
    this.set(this.TASKS_SORT_KEY, sortOptions);
  }

  getViewSettings() {
    return this.get(this.TASKS_VIEW_KEY);
  }

  setViewSettings(viewSettings: any) {
    this.set(this.TASKS_VIEW_KEY, viewSettings);
  }
}

export const localStorageService = LocalStorageService.getInstance();