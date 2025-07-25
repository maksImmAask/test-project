import { useAdminStore } from '../../../store/useAdminStore'
import { Box, Stack, Text, Title, Center } from '@mantine/core'
import { UsersLogic } from '../logic/logic'
const UsersPage = () => {
  UsersLogic()
  const { users, loading } = useAdminStore()
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
              <Title order={2} style={{flex: '1'}} mb="sm">
                Role
              </Title>
              <Title order={2} style={{flex: '1'}} mb="sm">
                Email
              </Title>
              </Box>

              {users.length === 0 ? (
                <Text c="dimmed">No users found</Text>
              ) : (
                <Stack>
                  {users.map((user) => (
                    <Box
                      key={user.id}
                      p="sm"
                      style={{
                        border: '1px solid #eaeaea',
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <Text style={{ flex: 1 }}>{user.name}</Text>
                      <Text style={{ flex: 1 }}>{user.password}</Text>
                      <Text style={{ flex: 1 }}>{user.role}</Text>
                      <Text style={{ flex: 1 }}>{user.email || 'N/A'}</Text>
                    </Box>
                  ))}
                </Stack>
              )}
            </>
  )
}

export default UsersPage
