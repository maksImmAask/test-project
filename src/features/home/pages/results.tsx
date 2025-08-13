import { Box, Button, Center, Stack, Text } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTestStore } from "../../../store/useTestStore";
import { useAuthStore } from "../../../store/useAuthStore";

const Results = () => {
  const { results } = useTestStore();
  const { hasFinishedTest} = useAuthStore();
  const navigate = useNavigate();
  if (!hasFinishedTest) {
    navigate("/");
    return null;
  }
  if (!results) {
    navigate("/");
    return null;
  }

  const { correct, total, timeSpent } = results;
  const percentage = Math.round((correct / total) * 100);
  const minutes = Math.floor(timeSpent / 60);
  const seconds = timeSpent % 60;

  return (
    <Center style={{ minHeight: "80vh" }}>
      <Box
        p="lg"
        style={{
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          minWidth: "300px",
        }}
      >
        <Stack gap="md" align="center">
          <Text size="xl" fw={700}>
            Результаты теста
          </Text>

          <Text size="md">
            Правильных ответов: <b>{correct}</b> из <b>{total}</b>
          </Text>

          <Text size="md">Процент: {percentage}%</Text>

          <Text size="md">
            Время: {minutes} мин {seconds} сек
          </Text>

          <Button fullWidth mt="md" onClick={() => navigate("/")}>
            На главную
          </Button>
        </Stack>
      </Box>
    </Center>
  );
};

export default Results;
