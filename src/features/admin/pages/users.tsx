import { Box, Text, Title, Center, Button, Accordion, Flex} from '@mantine/core'
import { UsersLogic } from '../logic/logic'
import { showNotification } from '@mantine/notifications'
const UsersPage = () => {
  const { loading, users, deleteUser, AddUserModal, EditUserModal } = UsersLogic()
  UsersLogic()
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
              <Title order={2} style={{flex: '1'}} mb="sm">
                Name
              </Title>
              <Title order={2} style={{flex: '1'}} mb="sm">
                Password
              </Title>
              <AddUserModal />
              </Box>

              {users.length === 0 ? (
                <Text c="dimmed">No users found</Text>
              ) : (
                // <Stack>
                //   {users.map((user) => (
                //     <Box
                //       key={user.id}
                //       p="sm"
                //       style={{
                //         border: '1px solid #eaeaea',
                //         borderRadius: 8,
                //         display: 'flex',
                //         alignItems: 'center',
                //         gap: '1rem',
                //       }}
                //     >
                //       <Text style={{ flex: 1 }}>{user.name}</Text>
                //       <Text style={{ flex: 1 }}>{user.password}</Text>
                //       <Text style={{ flex: 1 }}>{user.role}</Text>
                //       <Text style={{ flex: 1 }}>{user.email || 'N/A'}</Text>
                //     </Box>
                //   ))}
                // </Stack>
                <Accordion variant="separated" radius="md" chevronPosition="left">
                  {users.map((user) => (
                    <Accordion.Item key={user.id} value={String(user.id)}>
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
                          <Flex gap={'xs'}>
                            <EditUserModal user={user} disabled={user.role === 'admin'} />
                            <Button
                              size="xs"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation()
                                deleteUser(user.id)
                                showNotification({
                                  title: 'Успех',
                                  message: `Пользователь ${user.name} успешно удалён`,
                                  color: 'green',
                                })
                              }}
                              disabled={user.role === 'admin'}
                            >
                              Удалить
                            </Button>
                          </Flex>
                        </Box>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <Text>Role: {user.role}</Text>
                        <Text>Email: {user.email || 'N/A'}</Text>
                        <Text>Correct Answers: {user.correct}</Text>
                        <Text>Incorrect Answers: {user.incorrect}</Text>
                      </Accordion.Panel>
                    </Accordion.Item>
                  ))}
                </Accordion>
              )}
            </>
  )
}

export default UsersPage
