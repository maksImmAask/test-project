import {
  Modal,
  Stack,
  TextInput,
  NumberInput,
} from '@mantine/core'
import { UserEdit } from 'iconsax-react'
import { useDisclosure } from '@mantine/hooks'
import { useEffect } from 'react'
import { useForm } from '@mantine/form'
import { useAdminStore } from '../../store/useAdminStore'
import type { User } from '../../store/useAuthStore'
import { LoadingButton } from '../loadingButton/loadingButton'

type EditUserModalProps = {
  user: User
  disabled?: boolean
}

export function EditUserModal({ user, disabled = false }: EditUserModalProps) {
  const [opened, { open, close }] = useDisclosure(false)
  const { updateUser } = useAdminStore()

  const form = useForm({
    initialValues: {
      name: user.name,
      password: user.password,
      email: user.email,
      correct: user.correct,
      incorrect: user.incorrect,
    },
  })
  useEffect(() => {
    if (opened) {
      form.setValues({
        name: user.name,
        password: user.password,
        email: user.email,
        correct: user.correct,
        incorrect: user.incorrect,
      })
    }
    // eslint-disable-next-line
  }, [opened, user])

  const handleSubmit = async () => {
    try {
      await updateUser(user.id, { ...user, ...form.values })
      close()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <LoadingButton
        onAsyncClick={async () => {
          open()
        }}
        size="xs"
        disabled={disabled}
      >
        <UserEdit
        size="16"
        color="#FFF"
        style={{ marginRight: 4 }}
        />
        Редактировать
      </LoadingButton>

      <Modal
        opened={opened}
        onClose={close}
        title="Редактировать пользователя"
        centered
      >
        <form onSubmit={form.onSubmit(() => {})}>
          <Stack>
            <TextInput
              label="Имя"
              placeholder="Введите имя"
              {...form.getInputProps('name')}
              required
            />

            <TextInput
              label="Пароль"
              placeholder="Введите новый пароль"
              {...form.getInputProps('password')}
              required
            />

            <TextInput
              label="Email"
              placeholder="Введите email"
              {...form.getInputProps('email')}
            />

            <NumberInput
              label="Правильных ответов"
              min={0}
              {...form.getInputProps('correct')}
            />

            <NumberInput
              label="Неправильных ответов"
              min={0}
              {...form.getInputProps('incorrect')}
            />

            <LoadingButton
              fullWidth
              onAsyncClick={handleSubmit}
            >
              Сохранить изменения
            </LoadingButton>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
