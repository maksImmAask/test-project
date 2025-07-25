import { useState, useEffect } from 'react';
import { useNavigate} from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';
export const SignInLogic = () => {
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { register, loading, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  const handleRegister = async () => {
    await register({ name, password, role: 'user' });
    if (useAuthStore.getState().isAuthenticated) {
      navigate('/');
    }
  };
  return {
    name,
    setName,
    password,
    setPassword,
    handleRegister,
    loading
  };
}