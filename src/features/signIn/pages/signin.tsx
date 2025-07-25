import { SignInLogic } from '../logic/logic';
import { Link } from 'react-router-dom';
import {
  TextInput,
  PasswordInput,
  Button,
  Paper,
  Text,
  Center,
  Stack
} from '@mantine/core';

const Signin = () => {
  const { name, setName, password, setPassword, loading, handleRegister } = SignInLogic();
  return (
    <Center style={{ minHeight: '100vh' }}>
      <Paper shadow="md" radius="md" p="xl" withBorder style={{ width: 350 }}>
        <Text size="lg" fw={500} mb="md">Регистрация</Text>
        <Stack>
          <TextInput
            label="Имя пользователя"
            placeholder="Введите имя"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />

          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />

          <Text size="sm" mt="md">
            Уже есть аккаунт? <Link to="/login">Войти</Link>
          </Text>

          <Button
            fullWidth
            loading={loading}
            onClick={handleRegister}
            disabled={!name || !password}
          >
            Зарегистрироваться
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
};

export default Signin;
