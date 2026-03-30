import axios from 'axios'
import { URL } from '../utils/vars'

export const api = axios.create({
  baseURL: URL,
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
export const loginApi = (login: string, password: string) => api.post('/auth/login', { login: login.trim().toLowerCase(), password: password })