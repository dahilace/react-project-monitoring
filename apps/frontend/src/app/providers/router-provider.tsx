import { RouterProvider } from 'react-router-dom'
import { router } from '@/app/router'

export const AppRouter = () => {
  return <RouterProvider router={router} />
}