import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/api';
import { showNotification } from '@mantine/notifications';

export type User = {
  id: number;
  name: string;
  role: 'user' | 'admin';
  password: string;
  correct: number;
  incorrect: number;
  email: string;
};

type Credentials = {
  username: string;
  password: string;
};

type RegistrationData = {
  id?: number;
  name: string;
  password: string;
  email?: string;
  role: 'user';
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  hasFinishedTest: boolean;
  setHasFinishedTest: (value: boolean) => void;
  login: (credentials: Credentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<boolean>;
  logout: () => void;
  updateResults: (correct: number, incorrect: number) => Promise<void>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      hasFinishedTest: false,
      setHasFinishedTest: (value) => set({ hasFinishedTest: value }),

login: async (body) => {
  set({ loading: true, error: null });
  try {
    const { data } = await api.get<User[]>('/users', {
      params: { name: body.username }
    });

    if (data.length === 0) {
      throw new Error('Пользователь не найден');
    }

    const user = data[0];

    if (user.password !== body.password) {
      throw new Error('Неверный пароль');
    }

    set({
      user,
      isAuthenticated: true,
      loading: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
    set({ error: message, loading: false });
    showNotification(
      {
        title: 'Ошибка входа',
        message,
        color: 'red',
      }
    )
  }
}
,

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post<User>('/users', data);
          const user = response.data;

          set({ user, loading: false });
          return true;
        } catch (error) {
          console.log(error);
          set({ loading: false });
          showNotification(
            {
              title: 'Ошибка входа',
              message: 'Не удалось зарегистрироваться',
              color: 'red',
            }
          )
          return false;
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      updateResults: async (correct, incorrect) => {
        const user = get().user;
        if (!user) return;

        const updatedUser = {
          ...user,
          correct: user.correct + correct,
          incorrect: user.incorrect + incorrect,
        };

        try {
          await api.put(`/users/${user.id}`, updatedUser);
          set({ user: updatedUser });
        } catch (error) {
          showNotification({
            title: 'Ошибка',
            message: 'Не удалось обновить результаты',
            color: 'red',
          });
          console.error('Ошибка при обновлении результатов:', error);
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
