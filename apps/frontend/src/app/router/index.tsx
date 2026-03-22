import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { TasksPage } from '@/pages/tasks';
import { ProtectedRoute } from '@/shared/lib/ProtectedRoute';
import { AppLayout } from '../layouts/AppLayout';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <TasksPage />,
      },
    ],
  },
]);
