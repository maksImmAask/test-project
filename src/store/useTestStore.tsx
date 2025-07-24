import { create } from 'zustand'
import api from '../api/api' 

type Option = {
  id: number
  text: string
  isCorrect: boolean
}

type Question = {
  id: number
  question: string
  options: Option[]
}

type TestState = {
  tests: Question[]
  currentTest: Question | null
  loading: boolean
  setTests: (tests: Question[]) => void
  setCurrentTest: (test: Question | null) => void
  getTests: () => Promise<void>
}

export const useTestStore = create<TestState>((set) => ({
  tests: [],
  currentTest: null,
  loading: true,

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
  }
}))
