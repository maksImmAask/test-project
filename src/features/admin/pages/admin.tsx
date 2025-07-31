import { useNavigate, Outlet , useLocation} from 'react-router-dom'
import { Box, Button, Stack } from '@mantine/core'
import { useEffect } from 'react'
import { AdminLogic } from '../logic/logic'

export default function Admin() {
  AdminLogic()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/users', { replace: true })
    }
  }, [location.pathname, navigate])

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
              onClick={() => navigate('/admin/users')}
            >
              Users
            </Button>
            <Button
              fullWidth
              onClick={() => navigate('/admin/tests')}
            >
              Tests
            </Button>
          </Stack>
        </Box>
        <Box
          p="md"
          style={{
            flex: 5,
            overflowY: 'auto',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

