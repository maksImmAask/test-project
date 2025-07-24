import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'
import { Box, Button, Stack, Text, Title } from '@mantine/core'
import { useAdminStore } from '../store/useAdminStore'
import { useTestStore } from '../store/useTestStore'

const Admin = () => {
  const role = useAuthStore((state) => state.user?.role)
  const {isAuthenticated} = useAuthStore()
  const {loading} = useTestStore()
  const navigate = useNavigate()
  const getTests = useTestStore((state) => state.getTests)
  const {tests} = useTestStore()
  const users = useAdminStore((state) => state.users)
  useEffect(() => {
    getUsers()
    getTests()
  }, [])

  const getUsers = useAdminStore((state) => state.getUsers)

  useEffect(() => {
    if (isAuthenticated && role !== 'admin') {
      navigate('/login')
    }
  }, [isAuthenticated, role, navigate])

  const [activeTab, setActiveTab] = useState<'users' | 'tests'>('users')
  if (loading) {
    return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <Title order={2} style={{ textAlign: 'center' }}>
        Loading...
      </Title>
    </Box>
    )
  }

  return (
    <Box
      p="md"
      style={{
        height: '100vh',
        backgroundColor: '#f8f9fa',
        boxSizing: 'border-box',
      }}
    >
      <Box
        style={{
          display: 'flex',
          height: '100%',
          gap: '1rem',
        }}
      >
        <Box
          p="md"
          style={{
            flex: 1,
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Stack>
            <Button
              fullWidth
              variant={activeTab === 'users' ? 'filled' : 'light'}
              onClick={() => setActiveTab('users')}
            >
              Users
            </Button>
            <Button
              fullWidth
              variant={activeTab === 'tests' ? 'filled' : 'light'}
              onClick={() => setActiveTab('tests')}
            >
              Tests
            </Button>
          </Stack>
        </Box>
        <Box
          p="md"
          style={{
            flex: 3,
            overflowY: 'auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          {activeTab === 'users' && (
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
          )}


{activeTab === 'tests' && (
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
      <Title order={2} style={{ flex: 1 }} mb="sm">
        Correct Answer
      </Title>
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
            
          </Box>
        ))}
      </Stack>
    )}
  </>
)}

        </Box>
      </Box>
    </Box>
  )
}

export default Admin
