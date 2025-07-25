import { Box, Stack, Text, Title, Center, Button } from '@mantine/core'
import { useTestStore } from '../../../store/useTestStore'
import { TestsLogic } from '../logic/logic'
import { EditQuestionModal } from '../../../components/editmodal/editmodal'
import { AddQuestionModal } from '../../../components/modal/modal'
const TestsPage = () => {
  TestsLogic()
  
  const { selectedQuestion, setSelectedQuestion, editOpened, openEdit, closeEdit } = TestsLogic()
  const { tests, loading,  } = useTestStore()
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
      <Stack>
        {tests.map((test) => (
          <Box
            key={test.id}
            p="sm"
            style={{
              border: '1px solid #eaeaea',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              height: '60px',
            }}
          >
            <Text style={{ flex: 0.1 }}>{test.id}</Text>
            <Text style={{ flex: 1 }}>{test.question}</Text>
            <Text style={{ flex: 1 }}>
              {test.options
                .filter((option) => option.isCorrect)
                .map((option) => option.text)
                .join(', ') || 'N/A'}
            </Text>
            <Button  onClick={() => { setSelectedQuestion(test); openEdit() }}>
              Редактировать 
            </Button>
            <EditQuestionModal
              opened={editOpened}
              onClose={closeEdit}
              question={selectedQuestion}
            />
            
          </Box>
        ))}
      </Stack>
    )}
  </>
  )
}

export default TestsPage
