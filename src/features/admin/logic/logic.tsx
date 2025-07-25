
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../../store/useAuthStore'
import { useAdminStore } from '../../../store/useAdminStore'
import { useTestStore } from '../../../store/useTestStore'
import { useDisclosure } from '@mantine/hooks'
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
  
  const getTests = useTestStore((s) => s.getTests)

  useEffect(() => {
    getTests()
  }, [])
  return {
    selectedQuestion,
    setSelectedQuestion,
    editOpened,
    openEdit,
    closeEdit,
    getTests
  }
}
export const UsersLogic = () => {
  const getUsers = useAdminStore((s) => s.getUsers)

  useEffect(() => {
    getUsers()
  }, [])
}