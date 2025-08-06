import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/api';

export type User = {
  id: number;
  name: string;
  role: 'user' | 'admin' ;
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
  login: (credentials: Credentials) => Promise<void>;
  register: (data: RegistrationData) => Promise<boolean>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (body) => {
        set({ loading: true, error: null });
        try {
          const { data } = await api.get<User[]>('/users', {
            params: { name: body.username, password: body.password },
          });

          if (data.length === 0) {
            throw new Error('Неверное имя пользователя или пароль');
          }

          const user = data[0];

          set({
            user,
            isAuthenticated: true,
            loading: false,
          });
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Неизвестная ошибка';
          set({ error: message, loading: false });
        }
      },

      register: async (data) => {
        set({ loading: true, error: null });
        try {
          const response = await api.post<User>('/users', data);
          const user = response.data;
          
          set({ user, loading: false });
          return true
        } catch (error) {
          console.log(error);
          set({loading: false});
          return false
        }
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
