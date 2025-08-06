
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/useAuthStore'
import { AddUserModal } from '../../../components/modals/addUser'
import { useAdminStore } from '../../../store/useAdminStore'
import { useTestStore } from '../../../store/useTestStore'
import { useDisclosure } from '@mantine/hooks'
import { EditUserModal } from '../../../components/modals/editUser'
import type { Question } from '../../../store/useTestStore'
export const AdminLogic = () => {
  const role = useAuthStore((state) => state.user?.role)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated && role !== 'admin') {
      navigate('/login')
    }
  }, [isAuthenticated, role, navigate])
}
export const TestsLogic = () => {
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<number | null>(null)

const handleDelete = async () => {
  if (selectedId !== null) {
    try {
      await deleteTest(selectedId) 
    } catch (error) {
      console.error(error)
    }
    setSelectedId(null)
  }

  setDeleteModalOpen(false)
}

  const getTests = useTestStore((s) => s.getTests)
  const deleteTest = useTestStore((s) => s.deleteTest)
  useEffect(() => {
    getTests()
  }, [])
  return {
    setDeleteModalOpen,
    deleteModalOpen,
    handleDelete,
    setSelectedId,
    selectedId,
    selectedQuestion,
    setSelectedQuestion,
    editOpened,
    openEdit,
    closeEdit,
    getTests,
    deleteTest,
  }
}
export const UsersLogic = () => {
  const users = useAdminStore((s) => s.users)
  const loading = useAdminStore((s) => s.loading)
  const getUsers = useAdminStore((s) => s.getUsers)
  const deleteUser = useAdminStore((s) => s.deleteUser)
  const updateUser = useAdminStore((s) => s.updateUser)
  const addUser = useAdminStore((s) => s.addUser)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
  const handleDelete = async () => {
  if (selectedUserId !== null) {
    try {
      await deleteUser(selectedUserId) 
    } catch (error) {
      console.error(error)
    }
    setSelectedUserId(null)
  }

  setDeleteModalOpen(false)
}

  useEffect(() => {
    getUsers()
  }, [])
  return {
    getUsers,
    handleDelete,
    deleteModalOpen,
    setDeleteModalOpen,
    selectedUserId,
    setSelectedUserId,
    EditUserModal,
    users,
    AddUserModal,
    loading,
    deleteUser,
    updateUser,
    addUser,
  }
}