import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { useAdminStore } from '../../store/useAdminStore'

export function AddUserModal() {
  const [opened, { open, close }] = useDisclosure(false)
  const { addUser } = useAdminStore()

  const form = useForm({
    initialValues: {
      id: Date.now(),
      role: 'user' as 'user' | 'admin', 
      name: '',
      password: '',
      email: '',
      correct: 0,
      incorrect: 0,
    },
  })

  const handleSubmit = () => {
    addUser({ ...form.values })
      .then(() => {
        form.reset()
        close()
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <>
      <Button onClick={open}>Добавить Пользователя</Button>

      <Modal opened={opened} onClose={close} title="Добавить пользователя" centered>
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
              placeholder="Введите пароль"
              {...form.getInputProps('password')}
              required
            />

            <TextInput
              label="Email"
              placeholder="Введите email (необязательно)"
              {...form.getInputProps('email')}
            />

            <Button type="submit">Сохранить</Button>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
