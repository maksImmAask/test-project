import { Box, Text, Menu, UnstyledButton, Flex, Avatar } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { useAuthStore } from '../../store/useAuthStore'

export const Header = () => {
  const { user, isAuthenticated , logout} = useAuthStore()
  if (!isAuthenticated) return null 
  const userName = user?.name

  return (
    <Box
      px="md"
      py="sm"
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        borderBottom: '1px solid #ddd',
        backgroundColor: '#f8f9fa',
      }}
    >
      <Menu width={120} position="bottom-end" withArrow>
        <Menu.Target>
          <UnstyledButton>
            <Flex align="center" gap={8}>
              <Text fw={500}>{userName}</Text>
              <Avatar size="sm" radius="xl"/>
              <IconChevronDown size={16} />
            </Flex>
          </UnstyledButton>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item onClick={() => {logout()}}>Выйти</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}