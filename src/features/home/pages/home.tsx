import { Box, Button, Flex, Radio, Stack, Text, Loader } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useTestStore } from '../../../store/useTestStore';

const Home = () => {
  const [currentTarget, setCurrentTarget] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [testId: number]: number | null }>({});
  const { tests, getTests, loading } = useTestStore();
  useEffect(() => {
    getTests();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sortedTests = [...tests].sort((a, b) => a.id - b.id);
  const currentTest = sortedTests[currentTarget];

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
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentTest.id]: Number(value),
    }));
  };

  if (loading) {
    return <Loader color="#5c68ac" />;
  }

  if (sortedTests.length === 0) {
    return <Text>Нет доступных тестов</Text>;
  }

  return (
    <Box
      p="md"
      style={{
        height: '100%',
        width: '100%',
      }}
    >
      <Flex
        gap="md"
        style={{ height: '80vh' }}
      >
        <Box flex={3} style={{ padding: '16px', backgroundColor: '#f8f9fa', borderRadius: '10px' }}>
          <Flex direction="column" gap="md" style={{ height: '100%' }}>
            <Box>
              <Text fw={600}>{`Вопрос ${currentTarget + 1}: ${currentTest.question}`}</Text>
              <Radio.Group
                value={selectedAnswers[currentTest.id]?.toString() ?? ''}
                onChange={handleAnswerSelect}
              >
                <Stack mt="sm">
                  {currentTest.options.map((option, index) => (
                    <Button
                      key={index}
                      variant={
                        selectedAnswers[currentTest.id] === index ? 'filled' : 'outline'
                      }
                      fullWidth
                      onClick={() => handleAnswerSelect(index.toString())}
                    >
                      {option.text}
                    </Button>
                  ))}
                </Stack>
              </Radio.Group>
            </Box>
            <Flex gap="md" mt="auto">
              <Button onClick={handlePrev} disabled={currentTarget === 0}>
                Назад
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentTarget === sortedTests.length - 1}
              >
                Далее
              </Button>
            </Flex>
          </Flex>
        </Box>  
        <Box style={{ flex: 1 }}>
          <Flex direction="column" gap="md" style={{height: '100%'}} >
            <Box flex={1}>
              <Text>тут будет таймер</Text>
            </Box>
            <Box flex={4}>
                          <Flex wrap="wrap" gap="xs">
              {sortedTests.map((_, index) => (
                <Button
                  key={index}
                  size="xs"
                  variant={currentTarget === index ? 'filled' : 'outline'}
                  onClick={() => setCurrentTarget(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </Flex>
            </Box>


          </Flex>

        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
