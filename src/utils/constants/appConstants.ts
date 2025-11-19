/**
 * Общие константы приложения
 */

// Локальное хранилище
export const LOCAL_STORAGE_KEYS = {
  TASKS: 'tasks_data',
  THEME: 'app_theme',
  LANGUAGE: 'app_language',
  USER_PREFERENCES: 'user_preferences'
};

// API endpoints
export const API_ENDPOINTS = {
  TASKS: '/api/tasks',
  TASK_BY_ID: (id: string) => `/api/tasks/${id}`,
  TASK_STATUS: (id: string) => `/api/tasks/${id}/status`,
  TASK_PRIORITY: (id: string) => `/api/tasks/${id}/priority`
};

// Настройки пагинации
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZES: [5, 10, 20, 50],
  MAX_PAGE_SIZE: 100
};

// Настройки поиска
export const SEARCH = {
  DEBOUNCE_DELAY: 300,
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_LENGTH: 50
};

// Настройки уведомлений
export const NOTIFICATION = {
  AUTO_HIDE_DURATION: 5000,
  POSITION: {
    vertical: 'top' as const,
    horizontal: 'right' as const
  }
};

// Темы приложения
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system'
} as const;

// Языки приложения
export const LANGUAGES = {
  RU: 'ru',
  EN: 'en'
} as const;

// Ключи для роутинга
export const ROUTES = {
  HOME: '/',
  TASKS: '/tasks',
  TASK_DETAILS: (id: string = ':id') => `/tasks/${id}`,
  TASK_CREATE: '/tasks/create',
  TASK_EDIT: (id: string = ':id') => `/tasks/${id}/edit`,
  NOT_FOUND: '*'
};

// Мета-информация
export const APP_META = {
  TITLE: 'Task Manager',
  DESCRIPTION: 'Приложение для управления задачами',
  VERSION: '1.0.0',
  AUTHOR: 'Your Name'
};

// Настройки производительности
export const PERFORMANCE = {
  LAZY_LOAD_DELAY: 100,
  INFINITE_SCROLL_THRESHOLD: 100,
  CACHE_DURATION: 5 * 60 * 1000 // 5 минут
};

// Сообщения для пользователя
export const USER_MESSAGES = {
  TASK_CREATED: 'Задача успешно создана',
  TASK_UPDATED: 'Задача успешно обновлена',
  TASK_DELETED: 'Задача успешно удалена',
  TASK_STATUS_UPDATED: 'Статус задачи обновлен',
  OPERATION_FAILED: 'Произошла ошибка. Попробуйте еще раз',
  NO_TASKS: 'Задачи не найдены',
  NO_SEARCH_RESULTS: 'По вашему запросу ничего не найдено',
  LOADING: 'Загрузка...',
  SAVING: 'Сохранение...',
  DELETING: 'Удаление...'
};