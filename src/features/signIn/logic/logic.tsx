import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
import { notifications } from '@mantine/notifications';

export const SignInLogic = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { register, loading } = useAuthStore();
  const navigate = useNavigate();

  const handleRegister = async () => {
    const success = await register({ name, password, role: 'user' });

    if (success) {
      notifications.show({
        title: 'Успешно',
        message: 'Аккаунт создан. Теперь войдите.',
        color: 'green',
      });

      navigate('/login');
    } else {
      notifications.show({
        title: 'Ошибка',
        message: 'Не удалось зарегистрироваться',
        color: 'red',
      });
    }
  };

  return {
    name,
    setName,
    password,
    setPassword,
    handleRegister,
    loading,
  };
};
