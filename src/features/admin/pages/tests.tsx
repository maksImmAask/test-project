import {
  Box,
  Text,
  Title,
  Center,
  Button,
  Flex,
  Accordion,
  Pagination
} from '@mantine/core'
import { ConfirmDeleteModal } from '../../../components/modals/confirmDelete'
import { AnswerCheckbox } from '../../../components/checkbox/checkbox'
import '@mantine/notifications/styles.css'
import { useTestStore } from '../../../store/useTestStore'
import { TestsLogic } from '../logic/logic'
import { EditQuestionModal } from '../../../components/modals/editmodal'
import { AddQuestionModal } from '../../../components/modals/modal'
import { showNotification } from '@mantine/notifications'
import { useState } from 'react'

const TestsPage = () => {
  const {
    selectedQuestion,
    setSelectedQuestion,
    editOpened,
    closeEdit,
    openEdit,
    setDeleteModalOpen,
    setSelectedId,
    deleteModalOpen,
    handleDelete
  } = TestsLogic()

  const { tests, loading } = useTestStore()
  const [page, setPage] = useState(1)
  const itemsPerPage = 10

  const start = (page - 1) * itemsPerPage
  const paginatedTests = tests.slice(start, start + itemsPerPage)

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
        <Title order={2} style={{ flex: 1 }} mb="sm">
          Questions
        </Title>
        <AddQuestionModal />
      </Box>

      {tests.length === 0 ? (
        <Text c="dimmed">No tests found</Text>
      ) : (
        <>
          <Accordion variant="separated" radius="md" chevronPosition="left">
            {paginatedTests.map((test) => (
              <Accordion.Item key={test.id} value={test.id.toString()}>
                <Flex gap={'xs'}>
                  <Accordion.Control>
                    <Flex justify="space-between" align="center" w="100%">
                      <Text>{test.question}</Text>
                    </Flex>
                  </Accordion.Control>

                  <Flex gap="xs" style={{ margin: 'auto' }}>
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
                        setSelectedId(test.id)
                        setDeleteModalOpen(true)
                      }}
                    >
                      Удалить
                    </Button>
                  </Flex>
                </Flex>

                <Accordion.Panel>
                  <Flex direction="column" gap="xs">
                    {test.options.map((option) => (
                      <Button
                        key={option.id}
                        style={{ display: 'flex', alignItems: 'start', gap: '0.5rem' }}
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
                        <AnswerCheckbox isCorrect={option.isCorrect} />
                        {option.text}
                      </Button>
                    ))}
                  </Flex>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
          <Center>
          <Pagination
            total={Math.ceil(tests.length / itemsPerPage)}
            value={page}
            onChange={setPage}
            mt="md"
          />
          </Center>
        </>
      )}

      <EditQuestionModal
        opened={editOpened}
        onClose={closeEdit}
        question={selectedQuestion}
      />

      <ConfirmDeleteModal
        opened={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setSelectedId(null)
        }}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default TestsPage
