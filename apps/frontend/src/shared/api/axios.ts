import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://dahilass.ru/api-node/api',
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