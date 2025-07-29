import {
  Button,
  Modal,
  Stack,
  TextInput,
  NumberInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { useAdminStore } from '../../store/useAdminStore'
import type { User } from '../../store/useAuthStore'

type EditUserModalProps = {
  user: User,
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

  const handleSubmit = () => {
    updateUser(user.id, { ...user, ...form.values })
      .then(() => {
        showNotification({
          title: 'Пользователь обновлён',
          message: `Пользователь ${form.values.name} успешно обновлён`,
          color: 'green',
        })
        close()
      })
      .catch((error) => {
        showNotification({
          title: 'Ошибка',
          message: error.message,
          color: 'red',
        })
      })
  }

  return (
    <>
      <Button onClick={(e) => {e.stopPropagation(); open()}} size="xs"  disabled={disabled} >
        Редактировать
      </Button>

      <Modal opened={opened} onClose={close} title="Редактировать пользователя" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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

            <Button type="submit">Сохранить изменения</Button>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
