import { Box, Text, Title, Center, Button, Accordion, Flex, Loader, Pagination } from '@mantine/core'
import { UsersLogic } from '../logic/logic'
import { Trash } from 'iconsax-react'
import { ConfirmDeleteModal } from '../../../components/modals/confirmDelete'
import { useState } from 'react'

const USERS_PER_PAGE = 10

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
  const totalPages = Math.ceil(users.length / USERS_PER_PAGE)
  const start = (activePage - 1) * USERS_PER_PAGE
  const end = start + USERS_PER_PAGE
  const currentUsers = users.slice(start, end)

  if (loading) {
    return (
      <Center style={{ minHeight: '100%' }}>
        <Loader color='#5c68ac' />
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
          Users
        </Title>
        <AddUserModal />
      </Box>

      {users.length === 0 ? (
        <Text c="dimmed">No users found</Text>
      ) : (
        <>
          <Accordion variant="separated" radius="md" chevronPosition="left">
            {currentUsers.map((user, index) => (
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
                      key={index}
                    >
                      <Text style={{ flex: 0.1 }}>{start + index + 1}.</Text>
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
                      <Trash size="16" color='#5c68ac' style={{margin: 4}}/>
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
          <Center>
            
          </Center>
          {totalPages > 1 && (
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
              mt="md"
              
            />
          )}
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