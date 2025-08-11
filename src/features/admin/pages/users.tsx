import {
  Box,
  Text,
  Title,
  Center,
  Button,
  Flex,
  Loader,
  Pagination,
  Select,
  Table,
} from '@mantine/core'
import { UsersLogic } from '../logic/logic'
import { Trash } from 'iconsax-react'
import { ConfirmDeleteModal } from '../../../components/modals/confirmDelete'
import { useState } from 'react'

const PAGE_OPTIONS = ['5', '10', '15', '25']

const UsersPage = () => {
  const {
    loading,
    users,
    handleDelete,
    setSelectedUserId,
    deleteModalOpen,
    setDeleteModalOpen,
    AddUserModal,
    EditUserModal,
  } = UsersLogic()

  const [activePage, setActivePage] = useState(1)
  const [usersPerPage, setUsersPerPage] = useState(10)

  const totalPages = Math.max(1, Math.ceil(users.length / usersPerPage))
  const start = (activePage - 1) * usersPerPage
  const end = start + usersPerPage
  const currentUsers = users.slice(start, end)

  if (loading) {
    return (
      <Center style={{ minHeight: '100%' }}>
        <Loader color="#5c68ac" />
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
        <Title>(users per page: {usersPerPage})</Title>
        <AddUserModal />
      </Box>

      {users.length === 0 ? (
        <Text c="dimmed">No users found</Text>
      ) : (
        <>
          
          <Table>
            <Table.Thead>
              <Table.Tr>
                 <Table.Th>#</Table.Th>
                <Table.Th>Name</Table.Th>
                <Table.Th>Password</Table.Th>
                <Table.Th>Role</Table.Th>
                <Table.Th>Email</Table.Th>
                <Table.Th>Correct Answers</Table.Th>
                <Table.Th>Incorrect Answers</Table.Th>
                <Table.Th>Actions</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {currentUsers.map((user, index) => (
                <Table.Tr key={user.id}>
                  <Table.Td>{start + index + 1}</Table.Td>
                  <Table.Td>{user.name}</Table.Td>
                  <Table.Td>{user.password}</Table.Td>
                  <Table.Td>{user.role}</Table.Td>
                  <Table.Td>{user.email || 'N/A'}</Table.Td>
                  <Table.Td>{user.role === 'admin' ? '': user.correct}</Table.Td>
                  <Table.Td>{user.role === 'admin' ? '': user.incorrect}</Table.Td>
                  <Table.Td>
                    <Flex gap="xs">
                      <EditUserModal user={user} disabled={user.role === 'admin'} />
                      <Button
                        size="xs"
                        variant="outline"
                        onClick={() => {
                          setSelectedUserId(user.id)
                          setDeleteModalOpen(true)
                        }}
                        disabled={user.role === 'admin'}
                      >
                        <Trash size="16" color="#5c68ac" style={{ margin: 4 }} />
                        Удалить
                      </Button>
                    </Flex>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>

          </Table>

          <Center mt="md" style={{ gap: 16 }}>
            <Pagination
              value={activePage}
              onChange={setActivePage}
              total={totalPages}
            />
            <Select
              data={PAGE_OPTIONS}
              value={
                PAGE_OPTIONS.includes(String(usersPerPage))
                  ? String(usersPerPage)
                  : PAGE_OPTIONS[0]
              }
              onChange={(val) => {
                if (val === null) return
                const parsed = Number(val)
                if (!isNaN(parsed) && parsed > 0) {
                  setUsersPerPage(parsed)
                  setActivePage(1)
                }
              }}
              style={{ width: 80 }}
              placeholder="На стр."
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
