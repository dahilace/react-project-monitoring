// app/router/index.tsx
import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/app/providers/layout'

import { LoginPage } from '@/pages/login'
import { TasksPage } from '@/pages/task'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TasksPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
    ],
  },
])