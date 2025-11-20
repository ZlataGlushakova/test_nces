// Экспорт всех стилей и тем
import './variables.css';
import './globals.css';

export { lightTheme, darkTheme, themeUtils } from './theme';
export type { Theme } from './theme';

// Реэкспорт констант для удобства
export const CSS_VARIABLES = {
  colors: {
    primary: 'var(--primary-500)',
    primaryDark: 'var(--primary-600)',
    primaryLight: 'var(--primary-400)',
    success: 'var(--success-500)',
    warning: 'var(--warning-500)',
    error: 'var(--error-500)',
    status: {
      todo: 'var(--status-todo)',
      inProgress: 'var(--status-inProgress)',
      done: 'var(--status-done)',
    },
    priority: {
      low: 'var(--priority-low)',
      medium: 'var(--priority-medium)',
      high: 'var(--priority-high)',
    },
  },
  spacing: {
    xs: 'var(--spacing-xs)',
    sm: 'var(--spacing-sm)',
    md: 'var(--spacing-md)',
    lg: 'var(--spacing-lg)',
    xl: 'var(--spacing-xl)',
    '2xl': 'var(--spacing-2xl)',
    '3xl': 'var(--spacing-3xl)',
  },
  borderRadius: {
    sm: 'var(--border-radius-sm)',
    default: 'var(--border-radius)',
    lg: 'var(--border-radius-lg)',
    xl: 'var(--border-radius-xl)',
  },
  shadows: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
    xl: 'var(--shadow-xl)',
  },
  zIndex: {
    dropdown: 'var(--z-dropdown)',
    sticky: 'var(--z-sticky)',
    fixed: 'var(--z-fixed)',
    modalBackdrop: 'var(--z-modal-backdrop)',
    modal: 'var(--z-modal)',
    popover: 'var(--z-popover)',
    tooltip: 'var(--z-tooltip)',
  },
} as const;

// Утилитарные CSS классы
export const UTILITY_CLASSES = {
  // Flex
  flex: 'flex',
  flexColumn: 'flex-column',
  flexCenter: 'flex-center',
  flexBetween: 'flex-between',
  
  // Text alignment
  textCenter: 'text-center',
  textLeft: 'text-left',
  textRight: 'text-right',
  
  // Visibility
  visuallyHidden: 'visually-hidden',
  
  // Animations
  fadeIn: 'fade-in',
  slideIn: 'slide-in',
  spin: 'spin',
  
  // Scroll
  scrollbarHidden: 'scrollbar-hidden',
} as const;

// Типы для TypeScript
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type StatusType = 'todo' | 'inProgress' | 'done';
export type PriorityType = 'low' | 'medium' | 'high';

// Вспомогательные функции
export const getCSSVariable = (variable: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable);
};

export const setCSSVariable = (variable: string, value: string): void => {
  document.documentElement.style.setProperty(variable, value);
};

export const toggleTheme = (isDark: boolean): void => {
  if (isDark) {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
};