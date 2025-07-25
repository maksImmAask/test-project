import { create } from 'zustand'
import api from '../api/api'
import type { User } from './useAuthStore'
type AdminState = {
  users: User[]
  loading: boolean
  setUsers: (users: User[]) => void
  getUsers: () => Promise<void>
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  loading: true,
  setUsers: (users) => set({ users }),
  getUsers: async () => {
    try {
      const { data } = await api.get<User[]>('/users')
      set({ users: data , loading: false })
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    }
  },
}))
