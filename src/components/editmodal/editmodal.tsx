import {
  Button,
  Modal,
  TextInput,
  Group,
  Radio,
  Stack,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { useTestStore } from '../../store/useTestStore'
import { useEffect } from 'react'
import type { Question } from '../../store/useTestStore'
type Props = {
  opened: boolean
  onClose: () => void
  question: Question | null
}

export const EditQuestionModal = ({ opened, onClose, question }: Props) => {
  const updateTest = useTestStore((s) => s.updateTest)
  const deleteQuestion = useTestStore((s) => s.deleteQuestion)
  const handleDelete = async () => {
  if (!question) return // защита от null

  await deleteQuestion(question.id)
  onClose()
}

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
    if (question) {
      form.setValues({
        question: question.question,
        options: question.options.map((opt) => ({
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
      })
    }
  }, [question])

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

  const handleSubmit = form.onSubmit((values) => {
    if (!question) return

    const updated = {
      id: question.id,
      question: values.question,
      options: values.options.map((opt, i) => ({
        id: i,
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    }

    updateTest(question.id, updated)
    onClose()
  })

  return (
    <Modal opened={opened} onClose={onClose} title="Редактировать вопрос" size="lg">
      <form onSubmit={handleSubmit}>
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
            <Group>
              <Button variant="outline" color="red" onClick={() => {deleteQuestion(question.id); onClose()}}>
                Удалить вопрос
              </Button>
              <Button type="submit">Сохранить</Button>
            </Group>
          </Group>
        </Stack>
      </form>
    </Modal>
  )
}
