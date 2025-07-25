import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';

export const LoginLogic = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, loading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const handleLogin = async () => {
    await login({ username, password });
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/');
    }
  };
  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    loading
  };
}