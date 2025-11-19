/**
 * Обрезка текста с добавлением многоточия
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Преобразование в camelCase
 */
export const toCamelCase = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
};

/**
 * Преобразование в kebab-case
 */
export const toKebabCase = (str: string): string => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Первая буква заглавная
 */
export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Форматирование статуса задачи
 */
export const formatTaskStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'todo': 'Не начата',
    'inProgress': 'В процессе',
    'done': 'Выполнена'
  };
  return statusMap[status] || capitalizeFirst(status);
};

/**
 * Форматирование приоритета задачи
 */
export const formatTaskPriority = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    'low': 'Низкий',
    'medium': 'Средний',
    'high': 'Высокий'
  };
  return priorityMap[priority] || capitalizeFirst(priority);
};

/**
 * Генерация уникального ID
 */
export const generateId = (): string => {
  return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Поиск по подстроке без учета регистра
 */
export const searchInString = (text: string, searchTerm: string): boolean => {
  if (!text || !searchTerm) return false;
  return text.toLowerCase().includes(searchTerm.toLowerCase());
};