import { Box, Button, Flex, Text, Loader } from '@mantine/core';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTestStore } from '../../../store/useTestStore';

const Test = () => {
  const [currentTarget, setCurrentTarget] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [testId: number]: number | null }>({});
  const { tests, getTests, loading, setResults } = useTestStore();

  const [timeLeft, setTimeLeft] = useState(1800); 
  const timerRef = useRef<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getTests();
  }, [getTests]);

  const sortedTests = [...tests].sort((a, b) => a.id - b.id);
  const currentTest = sortedTests[currentTarget];

  useEffect(() => {
    if (sortedTests.length > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            navigate('/'); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [sortedTests, navigate]);

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

  const handleAnswerSelect = (value: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentTest.id]: value,
    }));
  };

  const handleFinish = () => {
    clearInterval(timerRef.current!);

    let correct = 0;

    sortedTests.forEach((test) => {
      const userAnswerIndex = selectedAnswers[test.id];
      if (typeof userAnswerIndex === 'number') {
        const userAnswer = test.options[userAnswerIndex];
      
        if (userAnswer && userAnswer.isCorrect) {
          correct++;
        }
      }
    });

    const timeSpent = 1800 - timeLeft;

    setResults({
      correct,
      total: sortedTests.length,
      timeSpent,
    });

    navigate('/results');
  };

  if (loading) return <Loader color="#5c68ac" />;
  if (sortedTests.length === 0) return <Text>Нет доступных тестов</Text>;

  return (
    <Box p="md" style={{ height: '100%', width: '100%' }}>
      <Flex gap="md" style={{ height: '80vh' }}>
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
                  >
                    {option.text}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Flex gap="md" mt="auto">
              <Button onClick={handlePrev} disabled={currentTarget === 0}>
                Назад
              </Button>
              <Button onClick={handleNext} disabled={currentTarget === sortedTests.length - 1}>
                Далее
              </Button>
            </Flex>
          </Flex>
        </Box>

        <Box style={{ flex: 1 }}>
          <Flex direction="column" gap="md" style={{ height: '100%' }}>
            <Box
              flex={1}
              style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}
            >
              <Text fw={700} size="lg">Осталось времени: {formatTime(timeLeft)}</Text>
            </Box>

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
                        variant={
                          currentTarget === index || selectedAnswers[sortedTests[index].id] !== undefined
                            ? 'filled'
                            : 'outline'
                        }
                        onClick={() => setCurrentTarget(index)}
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </Flex>
                </Box>
                <Box mt="auto">
                  <Button fullWidth color="red" onClick={handleFinish}>
                    Закончить тест
                  </Button>
                </Box>
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
};

export default Test;
