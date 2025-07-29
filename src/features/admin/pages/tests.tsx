import {
  Box,
  Text,
  Title,
  Center,
  Button,
  Flex,
  Accordion
} from '@mantine/core'
import '@mantine/notifications/styles.css'
import { useTestStore } from '../../../store/useTestStore'
import { TestsLogic } from '../logic/logic'
import { EditQuestionModal } from '../../../components/modals/editmodal'
import { AddQuestionModal } from '../../../components/modals/modal'
import { showNotification } from '@mantine/notifications'

const TestsPage = () => {

  const {
    selectedQuestion,
    setSelectedQuestion,
    editOpened,
    closeEdit,
    openEdit,
    deleteTest
  } = TestsLogic()

  const { tests, loading } = useTestStore()

  if (loading) {
    return (
      <Center style={{ minHeight: '100vh' }}>
        <Text>Loading...</Text>
      </Center>
    )
  }

  return (
    <>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1rem',
        }}
      >
        <Title order={2} style={{ flex: 0.2 }} mb="sm">
          Id
        </Title>
        <Title order={2} style={{ flex: 1 }} mb="sm">
          Question
        </Title>
        <Title order={2} style={{ flex: 1.1 }} mb="sm">
          Correct Answer
        </Title>
        <AddQuestionModal />
      </Box>

      {tests.length === 0 ? (
        <Text c="dimmed">No tests found</Text>
      ) : (
        <Accordion variant="separated" radius="md" chevronPosition="left">
          {tests.map((test) => (
            <Accordion.Item key={test.id} value={test.id.toString()}>
            <Accordion.Control>
              <Flex justify="space-between" align="center" w="100%">
                <Text>{test.question}</Text>
                <Flex gap="xs">
                  <Button
                    size="xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedQuestion(test)
                      openEdit()
                    }}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteTest(test.id)
                      showNotification({
                        title: 'Успех',
                        message: 'Вопрос успешно удален',
                        color: 'red',
                      })
                    }}
                  >
                    Удалить
                  </Button>
                </Flex>
              </Flex>
            </Accordion.Control>


              <Accordion.Panel>
                <Flex direction="column" gap="xs">
                  {test.options.map((option) => (
                    <Button
                            key={option.id}
                            variant={option.isCorrect ? 'filled' : 'outline'}
                            onClick={(e) => {
                              e.stopPropagation()

                              if (option.isCorrect) {
                                showNotification({
                                  title: 'Это правильный ответ',
                                  message: 'Вы выбрали правильный ответ.',
                                  color: 'green',
                                })
                              } else {
                                showNotification({
                                  title: 'Это неправильный ответ',
                                  message: 'Вы выбрали неправильный ответ.',
                                  color: 'red',
                                })
                              }
                            }}
                          >
                            {option.text}
      </Button>
                  ))}
                </Flex>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}

      <EditQuestionModal
        opened={editOpened}
        onClose={closeEdit}
        question={selectedQuestion}
      />
    </>
  )
}

export default TestsPage