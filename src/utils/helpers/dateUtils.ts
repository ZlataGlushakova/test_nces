import { format, parseISO, isBefore, isToday, isTomorrow } from 'date-fns';

/**
 * Форматирование даты для отображения
 */
export const formatDate = (dateString: string, formatString: string = 'dd.MM.yyyy'): string => {
  try {
    const date = parseISO(dateString);
    return format(date, formatString);
  } catch {
    return 'Invalid date';
  }
};

/**
 * Форматирование даты и времени
 */
export const formatDateTime = (dateString: string): string => {
  return formatDate(dateString, 'dd.MM.yyyy HH:mm');
};

/**
 * Проверка просрочена ли задача
 */
export const isOverdue = (dueDate: string): boolean => {
  try {
    const due = parseISO(dueDate);
    return isBefore(due, new Date()) && !isToday(due);
  } catch {
    return false;
  }
};

/**
 * Получение статуса дедлайна
 */
export const getDueDateStatus = (dueDate: string): 'overdue' | 'today' | 'tomorrow' | 'future' => {
  try {
    const due = parseISO(dueDate);
    
    if (isBefore(due, new Date()) && !isToday(due)) {
      return 'overdue';
    }
    if (isToday(due)) {
      return 'today';
    }
    if (isTomorrow(due)) {
      return 'tomorrow';
    }
    return 'future';
  } catch {
    return 'future';
  }
};

/**
 * Получение человеко-читаемого формата дедлайна
 */
export const getDueDateText = (dueDate: string): string => {
  const status = getDueDateStatus(dueDate);
  
  switch (status) {
    case 'overdue':
      return `Просрочено ${formatDate(dueDate)}`;
    case 'today':
      return 'Сегодня';
    case 'tomorrow':
      return 'Завтра';
    default:
      return formatDate(dueDate);
  }
};

/**
 * Сравнение дат для сортировки
 */
export const compareDates = (a: string, b: string): number => {
  try {
    const dateA = parseISO(a);
    const dateB = parseISO(b);
    return dateA.getTime() - dateB.getTime();
  } catch {
    return 0;
  }
};

/**
 * Проверка валидности даты
 */
export const isValidDate = (dateString: string): boolean => {
  try {
    const date = parseISO(dateString);
    return !isNaN(date.getTime());
  } catch {
    return false;
  }
};