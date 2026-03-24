import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3001/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('dahilace-token')

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export const getMe = () => api.get('/auth/me')
export const getUsers = () => api.get('/users')