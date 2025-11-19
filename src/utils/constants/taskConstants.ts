/**
 * Константы для работы с задачами
 */

// Статусы задач
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'inProgress',
  DONE: 'done'
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'Не начата',
  [TASK_STATUS.IN_PROGRESS]: 'В процессе',
  [TASK_STATUS.DONE]: 'Выполнена'
} as const;

export const TASK_STATUS_OPTIONS = [
  { value: TASK_STATUS.TODO, label: TASK_STATUS_LABELS[TASK_STATUS.TODO] },
  { value: TASK_STATUS.IN_PROGRESS, label: TASK_STATUS_LABELS[TASK_STATUS.IN_PROGRESS] },
  { value: TASK_STATUS.DONE, label: TASK_STATUS_LABELS[TASK_STATUS.DONE] }
];

// Приоритеты задач
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high'
} as const;

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: 'Низкий',
  [TASK_PRIORITY.MEDIUM]: 'Средний',
  [TASK_PRIORITY.HIGH]: 'Высокий'
} as const;

export const TASK_PRIORITY_OPTIONS = [
  { value: TASK_PRIORITY.LOW, label: TASK_PRIORITY_LABELS[TASK_PRIORITY.LOW] },
  { value: TASK_PRIORITY.MEDIUM, label: TASK_PRIORITY_LABELS[TASK_PRIORITY.MEDIUM] },
  { value: TASK_PRIORITY.HIGH, label: TASK_PRIORITY_LABELS[TASK_PRIORITY.HIGH] }
];

// Цвета для приоритетов
export const PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: '#52c41a', // green
  [TASK_PRIORITY.MEDIUM]: '#faad14', // orange
  [TASK_PRIORITY.HIGH]: '#f5222d' // red
};

// Цвета для статусов
export const STATUS_COLORS = {
  [TASK_STATUS.TODO]: '#d9d9d9', // gray
  [TASK_STATUS.IN_PROGRESS]: '#1890ff', // blue
  [TASK_STATUS.DONE]: '#52c41a' // green
};

// Фильтры
export const TASK_FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
} as const;

// Сортировка
export const TASK_SORT_OPTIONS = [
  { value: 'dueDate', label: 'По дедлайну' },
  { value: 'priority', label: 'По приоритету' },
  { value: 'createdAt', label: 'По дате создания' },
  { value: 'title', label: 'По названию' }
];

// Лимиты
export const TASK_LIMITS = {
  TITLE_MIN_LENGTH: 2,
  TITLE_MAX_LENGTH: 100,
  DESCRIPTION_MAX_LENGTH: 500,
  TAG_MAX_LENGTH: 20,
  TAGS_MAX_COUNT: 5
};

// Сообщения об ошибках
export const TASK_ERRORS = {
  TITLE_REQUIRED: 'Заголовок обязателен',
  TITLE_TOO_SHORT: `Заголовок должен содержать минимум ${TASK_LIMITS.TITLE_MIN_LENGTH} символа`,
  TITLE_TOO_LONG: `Заголовок не должен превышать ${TASK_LIMITS.TITLE_MAX_LENGTH} символов`,
  DESCRIPTION_TOO_LONG: `Описание не должно превышать ${TASK_LIMITS.DESCRIPTION_MAX_LENGTH} символов`,
  TAG_TOO_LONG: `Тег не должен превышать ${TASK_LIMITS.TAG_MAX_LENGTH} символов`,
  TOO_MANY_TAGS: `Нельзя добавить более ${TASK_LIMITS.TAGS_MAX_COUNT} тегов`
};