import { Box, Button, Flex, Text, Loader } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useTestStore } from '../../../store/useTestStore';

const Home = () => {
  const [currentTarget, setCurrentTarget] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [testId: number]: number | null }>({});
  const { tests, getTests, loading } = useTestStore();

  const [timeLeft, setTimeLeft] = useState(1800); 
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    getTests();
  }, [getTests]);

  const sortedTests = [...tests].sort((a, b) => a.id - b.id);
  const currentTest = sortedTests[currentTarget];

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isRunning, timeLeft]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleNext = () => {
    if (currentTarget < sortedTests.length - 1) {
      setCurrentTarget(currentTarget + 1);
    }
  };

  const handlePrev = () => {
    if (currentTarget > 0) {
      setCurrentTarget(currentTarget - 1);
    }
  };

  const handleAnswerSelect = (value: string | number) => {
    if (!isRunning) return; 
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentTest.id]: Number(value),
    }));
  };

  if (loading) return <Loader color="#5c68ac" />;
  if (sortedTests.length === 0) return <Text>Нет доступных тестов</Text>;

  return (
    <Box p="md" style={{ height: '100%', width: '100%' }}>
      <Flex gap="md" style={{ height: '80vh' }}>
        {/* Левая часть — вопрос и ответы */}
        <Box flex={3} style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
          <Flex direction="column" gap="md" style={{ height: '100%' }}>
            <Box>
              <Text fw={600}>{`Вопрос ${currentTarget + 1}: ${currentTest.question}`}</Text>
              <Flex direction="column" mt="sm" gap="sm">
                {currentTest.options.map((option, index) => (
                  <Button
                    key={index}
                    variant={selectedAnswers[currentTest.id] === index ? 'filled' : 'outline'}
                    fullWidth
                    onClick={() => handleAnswerSelect(index)}
                    disabled={!isRunning} 
                  >
                    {option.text}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Flex gap="md" mt="auto">
              <Button onClick={handlePrev} disabled={currentTarget === 0 || !isRunning}>
                Назад
              </Button>
              <Button onClick={handleNext} disabled={currentTarget === sortedTests.length - 1 || !isRunning}>
                Далее
              </Button>
            </Flex>
          </Flex>
        </Box>

        {/* Правая часть — таймер и навигация */}
        <Box style={{ flex: 1 }}>
          <Flex direction="column" gap="md" style={{ height: '100%' }}>
            {/* Таймер */}
            <Box
              flex={1}
              style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}
            >
              <Text fw={700} size="lg">Осталось времени: {formatTime(timeLeft)}</Text>
            </Box>

            {/* Панель с номерами вопросов и кнопками управления */}
            <Box
              flex={4}
              style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}
            >
              <Flex direction="column" gap="md" style={{ height: '100%' }}>
                <Box flex={1}>
                  <Flex wrap="wrap" gap="xs">
                    {sortedTests.map((_, index) => (
                      <Button
                        key={index}
                        size="xs"
                        variant={currentTarget === index ? 'filled' : 'outline'}
                        onClick={() => setCurrentTarget(index)}
                        disabled={!isRunning} 
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </Flex>
                </Box>
                <Box flex={1}>
                  <Box mt='auto'>
                    <Flex direction='column' gap={'sm'} style={{height: '100%'}}>
                      <Button fullWidth color="green" onClick={handleStart} disabled={isRunning}>
                        Начать тест
                      </Button>
                      <Button fullWidth color="red" onClick={handleStop}>
                        Закончить тест
                      </Button>
                    </Flex>
                  </Box>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
