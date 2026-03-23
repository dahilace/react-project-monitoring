import { createBrowserRouter } from 'react-router-dom';
import { LoginPage } from '@/pages/login';
import { TasksPage } from '@/pages/tasks';
import { ProtectedRoute } from '@/shared/lib/ProtectedRoute';
import { App } from '../App';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App />
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
