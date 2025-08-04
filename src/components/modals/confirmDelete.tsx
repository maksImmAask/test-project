import { Modal, Button, Text } from '@mantine/core'
import { LoadingButton } from '../loadingButton/loadingButton'

type ConfirmDeleteModalProps = {
  opened: boolean
  onClose: () => void
  onConfirm: () => Promise<void> 
  title?: string
  description?: string
}

export function ConfirmDeleteModal({
  opened,
  onClose,
  onConfirm,
  title = 'Удалить?',
  description = 'Вы уверены, что хотите удалить этот элемент?',
}: ConfirmDeleteModalProps) {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
    >
      <Text mb="md">{description}</Text>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
        <Button variant="default" onClick={onClose}>
          Отмена
        </Button>
        <LoadingButton color="red" onAsyncClick={onConfirm}>
          Удалить
        </LoadingButton>
      </div>
    </Modal>
  )
}
