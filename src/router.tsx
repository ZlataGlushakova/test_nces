import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { CircularProgress, Box } from '@mui/material';

// Lazy loading для оптимизации загрузки
const Layout = lazy(() => import('./components/layout/Layout'));
const TaskListPage = lazy(() => import('../pages/TaskListPage/TaskListPage'));
const TaskDetailPage = lazy(() => import('./pages/TaskDetailPage/TaskDetailPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

// Компонент загрузки
const Loader = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight="200px"
  >
    <CircularProgress />
  </Box>
);

// Оборачиваем компоненты в Suspense для lazy loading
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: withSuspense(Layout),
    errorElement: withSuspense(NotFoundPage),
    children: [
      {
        index: true,
        element: withSuspense(TaskListPage),
      },
      {
        path: 'tasks',
        children: [
          {
            index: true,
            element: withSuspense(TaskListPage),
          },
          {
            path: ':taskId',
            element: withSuspense(TaskDetailPage),
          },
          {
            path: 'new',
            element: withSuspense(TaskListPage), // Модальное окно будет открыто через состояние
          },
        ],
      },
      {
        path: 'tags/:tag',
        element: withSuspense(TaskListPage),
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFoundPage),
  },
]);

// Вспомогательная функция для генерации путей
export const ROUTES = {
  HOME: '/',
  TASKS: '/tasks',
  TASK_NEW: '/tasks/new',
  TASK_DETAIL: (taskId: string) => `/tasks/${taskId}`,
  TASKS_BY_TAG: (tag: string) => `/tags/${encodeURIComponent(tag)}`,
} as const;