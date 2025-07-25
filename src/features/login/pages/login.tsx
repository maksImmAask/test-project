
import { Link } from 'react-router-dom';
import { TextInput ,PasswordInput, Button, Paper, Text, Center, Stack } from '@mantine/core';
import { LoginLogic } from '../logic/logic';
const Login = () => {
  LoginLogic();
  const { username, setUsername, password, setPassword, loading, handleLogin } = LoginLogic();

  return (
    <Center style={{ minHeight: '100vh' }}>
      <Paper shadow="md" radius="md" p="xl" withBorder style={{ width: 350 }}>
        <Text size="lg" fw={500} mb="md">Вход</Text>
        <Stack>
          <TextInput
            label="Имя пользователя"
            placeholder="Введите имя"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            required
          />

          <PasswordInput
            label="Пароль"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
          <Text size="sm"  mt="md">
            Нет аккаунта? <Link to="/signin">Зарегистрироваться</Link>
          </Text>
          <Button
            fullWidth
            loading={loading}
            onClick={handleLogin}
            disabled={!username || !password}
          >
            Войти
          </Button>
        </Stack>
      </Paper>
    </Center>
  );
};

export default Login
