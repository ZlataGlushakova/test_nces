// router.tsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { TaskListPage } from './pages/TaskListPage';
import { TaskDetailsPage } from './pages/TaskDetailsPage';
import { TaskFormPage } from './pages/TaskFormPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/tasks" replace />,
      },
      {
        path: 'tasks',
        children: [
          {
            index: true,
            element: <TaskListPage />,
          },
          {
            path: 'new',
            element: <TaskFormPage />,
          },
          {
            path: ':taskId',
            element: <TaskDetailsPage />,
          },
          {
            path: 'edit/:taskId', // Добавить маршрут для редактирования
            element: <TaskFormPage />,
          },
        ],
      },
      {
        path: '404',
        element: <NotFoundPage />,
      },
      {
        path: '*',
        element: <Navigate to="/404" replace />,
      },
    ],
  },
]);