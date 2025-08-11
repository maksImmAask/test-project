import { Modal, Center, Button, Text, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useTestStore } from "../../../store/useTestStore";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const { tests } = useTestStore();
  const [opened, setOpened] = useState(true);

  const timeLimit = 1800; 
  const minutes = Math.floor(timeLimit / 60);

  const handleStart = () => {
    setOpened(false);
    navigate("/test");
  };

  return (
    <Center style={{ padding: "20px" }}>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Информация о тесте"
        styles={{
          content: {
            boxShadow: "none",
          },
        }}
        centered
        withOverlay={false}
        withCloseButton={false}
        closeOnClickOutside={false}
      >
        <Stack gap="sm">
          <Text size="md">Время на тест: {minutes} минут</Text>
          <Text size="md">Количество вопросов: {tests.length}</Text>

          <Button fullWidth color="blue" onClick={handleStart}>
            Начать тест
          </Button>
        </Stack>
      </Modal>
    </Center>
  );
};

export default Home;
