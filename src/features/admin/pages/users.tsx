import { Box, Text, Title, Center, Button, Accordion, Flex, Pagination } from '@mantine/core'
import { useState } from 'react'
import { UsersLogic } from '../logic/logic'
import { ConfirmDeleteModal } from '../../../components/modals/confirmDelete'

const UsersPage = () => {
  const {
    loading,
    users,
    handleDelete,
    setSelectedUserId,
    deleteModalOpen,
    setDeleteModalOpen,
    AddUserModal,
    EditUserModal
  } = UsersLogic()

  const [activePage, setActivePage] = useState(1)
  const perPage = 10
  const start = (activePage - 1) * perPage
  const end = start + perPage
  const currentUsers = users.slice(start, end)

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
        <Title order={2} style={{ flex: '1' }} mb="sm">
          Name
        </Title>
        <Title order={2} style={{ flex: '1' }} mb="sm">
          Password
        </Title>
        <AddUserModal />
      </Box>

      {users.length === 0 ? (
        <Text c="dimmed">No users found</Text>
      ) : (
        <>
          <Accordion variant="separated" radius="md" chevronPosition="left">
            {currentUsers.map((user) => (
              <Accordion.Item key={user.id} value={String(user.id)}>
                <Flex gap={'xs'}>
                  <Accordion.Control>
                    <Box
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Text style={{ flex: 1 }}>{user.name}</Text>
                      <Text style={{ flex: 1 }}>{user.password}</Text>
                    </Box>
                  </Accordion.Control>
                  <Flex gap={'xs'} style={{ margin: 'auto' }}>
                    <EditUserModal user={user} disabled={user.role === 'admin'} />
                    <Button
                      size="xs"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedUserId(user.id)
                        setDeleteModalOpen(true)
                      }}
                      disabled={user.role === 'admin'}
                    >
                      Удалить
                    </Button>
                  </Flex>
                </Flex>
                <Accordion.Panel>
                  <Text>Role: {user.role}</Text>
                  <Text>Email: {user.email || 'N/A'}</Text>
                  <Text>Correct Answers: {user.correct}</Text>
                  <Text>Incorrect Answers: {user.incorrect}</Text>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>

          <Center mt="md">
            <Pagination
              total={Math.ceil(users.length / perPage)}
              value={activePage}
              onChange={setActivePage}
              size="sm"
            />
          </Center>
        </>
      )}

      <ConfirmDeleteModal
        opened={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false)
          setSelectedUserId(null)
        }}
        onConfirm={handleDelete}
      />
    </>
  )
}

export default UsersPage
