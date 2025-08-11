import { create } from 'zustand'
import { showNotification } from '@mantine/notifications'
import '@mantine/notifications/styles.css'
import api from '../api/api'

export type Option = {
  id: number
  text: string
  isCorrect: boolean
}
type TestResult = {
  correct: number;
  total: number;
  timeSpent: number;
}

export type Question = {
  id: number
  question: string
  options: Option[]
}

type TestState = {
  tests: Question[]
  currentTest: Question | null
  loading: boolean
  search: string
  results: TestResult | null
  setSearch: (search: string) => void
  setTests: (tests: Question[]) => void
  setCurrentTest: (test: Question | null) => void
  getTests: () => Promise<void>
  setResults: (res: TestResult | null) => void
  deleteTest: (id: number) => Promise<void>
  updateTest: (id: number, updatedQuestion: Question) => Promise<void>
  addQuestion: (question: Question) => Promise<void>
}

export const useTestStore = create<TestState>((set) => ({
  tests: [],
  results: null,
  currentTest: null,
  loading: true,
  search: '',
  setResults: (res) => set({ results: res }),
  setSearch: (search) => set({ search }),

  setTests: (tests) => set({ tests }),

  setCurrentTest: (test) => set({ currentTest: test }),

  getTests: async () => {
    try {
      const { data } = await api.get<Question[]>('/test')
      set({ tests: data, loading: false })
    } catch (error) {
      console.error('Ошибка загрузки тестов:', error)
    } finally {
      console.log('Тесты загружены:', useTestStore.getState().tests)
    }
  },

  addQuestion: async (question) => {
    try {
      const { data } = await api.post<Question>('/test', question)
      set((state) => ({
        tests: [...state.tests, data],
      }))
    } catch (error) {
      console.error('Ошибка при добавлении вопроса:', error)
      showNotification ({
        title: 'Ошибка',
        message: 'Не удалось добавить тест',
        color:  'red'
      })
    } finally {
      showNotification ({
        title: 'Успех',
        message: 'Тест добавлен',
        color:  'green'
      })
    }
  },

  updateTest: async (id, updatedQuestion) => {
    try {
      set((state) => ({
        tests: state.tests.map((test) =>
          test.id === id ? updatedQuestion : test
        ),
      }))

      await api.put(`/test/${id}`, updatedQuestion)
    } catch (error) {
      console.error('Ошибка при обновлении теста:', error)
      showNotification ({
        title: 'Ошибка',
        message: 'Не удалось обновить',
        color:  'red'
      })
    } finally {
      showNotification ({
        title: 'Успешно',
        message: 'тест обновлен',
        color:  'green'
      })
    }
  },

  deleteTest: async (id) => {
    try {
      await api.delete(`/test/${id}`)
      set((state) => ({
        tests: state.tests.filter((test) => test.id !== id),
      }))
    } catch (error) {
      console.error('Ошибка при удалении теста:', error)
      showNotification ({
        title: 'Ошибка',
        message: 'Не удалось удалить',
        color: 'green'
      })
    } finally {
      showNotification ({
        title: 'Успех',
        message: 'Тест удален',
        color: 'green'
      })
    }
  },
}))
