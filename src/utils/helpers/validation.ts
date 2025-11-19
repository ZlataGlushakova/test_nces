import { ITask } from '../../types';

/**
 * Валидация email
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Валидация обязательного поля
 */
export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Валидация минимальной длины
 */
export const validateMinLength = (value: string, minLength: number): boolean => {
  return value.trim().length >= minLength;
};

/**
 * Валидация максимальной длины
 */
export const validateMaxLength = (value: string, maxLength: number): boolean => {
  return value.trim().length <= maxLength;
};

/**
 * Валидация задачи
 */
export const validateTask = (task: Partial<ITask>): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  // Валидация заголовка
  if (!task.title?.trim()) {
    errors.title = 'Заголовок обязателен';
  } else if (task.title.length < 2) {
    errors.title = 'Заголовок должен содержать минимум 2 символа';
  } else if (task.title.length > 100) {
    errors.title = 'Заголовок не должен превышать 100 символов';
  }

  // Валидация описания
  if (task.description && task.description.length > 500) {
    errors.description = 'Описание не должно превышать 500 символов';
  }

  // Валидация статуса
  if (!task.status) {
    errors.status = 'Статус обязателен';
  } else if (!['todo', 'inProgress', 'done'].includes(task.status)) {
    errors.status = 'Некорректный статус';
  }

  // Валидация приоритета
  if (!task.priority) {
    errors.priority = 'Приоритет обязателен';
  } else if (!['low', 'medium', 'high'].includes(task.priority)) {
    errors.priority = 'Некорректный приоритет';
  }

  // Валидация дедлайна
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    if (isNaN(dueDate.getTime())) {
      errors.dueDate = 'Некорректная дата';
    }
  }

  // Валидация тегов
  if (task.tags) {
    const invalidTags = task.tags.filter(tag => tag.length > 20);
    if (invalidTags.length > 0) {
      errors.tags = 'Тег не должен превышать 20 символов';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Валидация формы поиска
 */
export const validateSearch = (searchTerm: string): { isValid: boolean; error?: string } => {
  if (searchTerm.length > 50) {
    return {
      isValid: false,
      error: 'Поисковый запрос не должен превышать 50 символов'
    };
  }

  return {
    isValid: true
  };
};

/**
 * Очистка данных от XSS
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
};