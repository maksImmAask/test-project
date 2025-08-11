import { Container, Title, Text, Button, Group } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Container
      style={{
        textAlign: "center",
        paddingTop: "100px",
      }}
    >
      <Title order={1} size="3rem" style={{ fontWeight: 900 }}>
        404
      </Title>

      <Text c="dimmed" size="lg" mt="md">
        Страница, которую вы ищете, не существует.
        Возможно, вы ошиблись адресом или страница была удалена.
      </Text>

      <Group justify="center" mt="xl">
        <Button variant="filled" color="blue" onClick={() => navigate("/")}>
          На главную
        </Button>
      </Group>
    </Container>
  );
}
