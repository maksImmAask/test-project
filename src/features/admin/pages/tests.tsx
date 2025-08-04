import {
  Box,
  Text,
  Title,
  Center,
  Button,
  Flex,
  Accordion,
  Pagination,
  Loader
} from '@mantine/core'
import { NoteRemove } from 'iconsax-react'
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
      <Center style={{ minHeight: '100%' }}>
        <Loader color='#5c68ac'></Loader>
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
            {paginatedTests.map((test, index) => (
              <Accordion.Item key={test.id} value={test.id.toString()}>
                <Flex gap={'xs'}>
                  <Accordion.Control>
                    <Box style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }} key={index}>
                      <Text>{start + index + 1}.</Text>
                      <Text>{test.question}</Text>
                    </Box>
                  </Accordion.Control>

                <Flex gap="xs" style={{ margin: 'auto' }}>
                  <EditQuestionModal question={test} />
                  <Button
                    size="xs"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      setSelectedId(test.id)
                      setDeleteModalOpen(true)
                    }}
                  >
                    <NoteRemove
                      size="16"
                      color="#5c68ac"
                      variant="Broken"
                      style={{ marginRight: 4 }}
                    />
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
