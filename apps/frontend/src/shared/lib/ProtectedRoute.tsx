import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem('dahilace-token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}