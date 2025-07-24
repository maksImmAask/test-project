import { create } from 'zustand'
import api from '../api/api'
import type { User } from './useAuthStore'
type AdminState = {
  users: User[]
  setUsers: (users: User[]) => void
  getUsers: () => Promise<void>
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  getUsers: async () => {
    try {
      const { data } = await api.get<User[]>('/users')
      set({ users: data })
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    }
  },
}))
