import { Button, Modal, Stack, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { useAdminStore } from '../../store/useAdminStore'
import { Add } from 'iconsax-react'
import { LoadingButton } from '../loadingButton/loadingButton'

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

const handleSubmit = async () => {
  try {
    await addUser({ ...form.values });
    form.reset();
    close(); 
  } catch {
    // обработка ошибок
  }
};

  return (
    <>
      <Button onClick={open}> <Add size={16} style={{margin: 4}} color='#fff'/> Добавить Пользователя</Button>

      <Modal opened={opened} onClose={close} title="Добавить пользователя" centered>
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
              placeholder="Введите пароль"
              {...form.getInputProps('password')}
              required
            />

            <TextInput
              label="Email"
              placeholder="Введите email (необязательно)"
              {...form.getInputProps('email')}
            />

            <LoadingButton
              fullWidth
              onAsyncClick={async () => {
                await handleSubmit();
              }}
            >
              Сохранить
            </LoadingButton>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
