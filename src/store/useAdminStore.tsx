import { create } from 'zustand'
import api from '../api/api'
import type { User } from './useAuthStore'
type AdminState = {
  users: User[]
  loading: boolean
  setUsers: (users: User[]) => void
  getUsers: () => Promise<void>
  deleteUser: (id: number) => Promise<void>
  updateUser: (id: number, updatedUser: User) => Promise<void>
  addUser: (user: User) => Promise<void>
}

export const useAdminStore = create<AdminState>((set) => ({
  users: [],
  loading: true,
  setUsers: (users) => set({ users }),
  addUser: async (user) => {
    try {
      const { data } = await api.post<User>('/users', user)
      set((state) => ({
        users: [...state.users, data],
      }))
    } catch (error) {
      console.error('Ошибка при добавлении пользователя:', error)
    }
  },
  deleteUser: async (id) => {
    try {
      await api.delete(`/users/${id}`)
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }))
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error)
    }
  },
  updateUser: async (id, updatedUser) => {
    try {
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? updatedUser : user
        ),
      }))
      await api.put(`/users/${id}`, updatedUser)
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error)
    }
  },
  getUsers: async () => {
    try {
      const { data } = await api.get<User[]>('/users')
      set({ users: data , loading: false })
    } catch (error) {
      console.error('Ошибка при загрузке пользователей:', error)
    }
  },
}))
