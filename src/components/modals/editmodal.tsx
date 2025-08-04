import {
  Modal,
  TextInput,
  Group,
  Radio,
  Stack,
  Button,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTestStore } from '../../store/useTestStore'
import { useEffect, useState } from 'react'
import type { Question } from '../../store/useTestStore'
import { LoadingButton } from '../loadingButton/loadingButton'
import { Edit } from 'iconsax-react'

type Props = {
  question: Question
  disabled?: boolean
}

export function EditQuestionModal({ question, disabled = false }: Props) {
  const [opened, setOpened] = useState(false)
  const updateTest = useTestStore((s) => s.updateTest)

  const form = useForm({
    initialValues: {
      question: '',
      options: [
        { text: '', isCorrect: true },
        { text: '', isCorrect: false },
      ],
    },
    validate: {
      question: (val) => (!val.trim() ? 'Введите вопрос' : null),
      options: (opts) =>
        opts.some((opt) => !opt.text.trim()) ? 'Все варианты должны быть заполнены' : null,
    },
  })

  useEffect(() => {
    if (opened && question) {
      form.reset()
      form.setValues({
        question: question.question,
        options: question.options.map((opt) => ({
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
      })
    }
    // eslint-disable-next-line
  }, [opened, question])

  const setCorrect = (index: number) => {
    const updated = form.values.options.map((opt, i) => ({
      ...opt,
      isCorrect: i === index,
    }))
    form.setFieldValue('options', updated)
  }

  const addOption = () => {
    form.setFieldValue('options', [...form.values.options, { text: '', isCorrect: false }])
  }

  const removeOption = (index: number) => {
    const updated = form.values.options.filter((_, i) => i !== index)
    if (!updated.some((opt) => opt.isCorrect)) {
      updated[0].isCorrect = true
    }
    form.setFieldValue('options', updated)
  }

  const handleAsyncSubmit = async () => {
    const isValid = form.validate()
    if (isValid.hasErrors || !question) return

    const values = form.values
    const updated = {
      id: question.id,
      question: values.question,
      options: values.options.map((opt, i) => ({
        id: i,
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    }

    await updateTest(question.id, updated)
    setOpened(false)
  }

  return (
    <>
      <LoadingButton
        onAsyncClick={async () => setOpened(true)}
        size="xs"
        disabled={disabled}
      >
        <Edit size={16} style={{ marginRight: 4 }} color="#fff" />
        Редактировать
      </LoadingButton>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Редактировать вопрос"
        size="lg"
        overlayProps={{ backgroundOpacity: 0.3 }}
      >
        <form onSubmit={e => e.preventDefault()}>
          <Stack>
            <TextInput
              label="Вопрос"
              {...form.getInputProps('question')}
              required
            />

            <Radio.Group
              label="Ответы"
              value={String(form.values.options.findIndex((opt) => opt.isCorrect))}
              onChange={(val) => setCorrect(Number(val))}
              withAsterisk
            >
              <Stack>
                {form.values.options.map((option, index) => (
                  <Group key={index} align="center">
                    <Radio value={String(index)} />
                    <TextInput
                      placeholder={`Ответ ${index + 1}`}
                      value={option.text}
                      onChange={(event) =>
                        form.setFieldValue(`options.${index}.text`, event.currentTarget.value)
                      }
                      style={{ flex: 1 }}
                      required
                    />
                    {form.values.options.length > 2 && (
                      <Button
                        variant="subtle"
                        color="red"
                        size="xs"
                        onClick={() => removeOption(index)}
                      >
                        Удалить
                      </Button>
                    )}
                  </Group>
                ))}
              </Stack>
            </Radio.Group>

            <Group justify="space-between" mt="sm">
              <Button variant="light" onClick={addOption}>
                Добавить вариант
              </Button>
              <LoadingButton onAsyncClick={handleAsyncSubmit}>
                Сохранить
              </LoadingButton>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
