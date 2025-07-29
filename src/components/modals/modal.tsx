import {
  Button,
  Modal,
  TextInput,
  Group,
  Radio,
  Stack,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import { useTestStore } from '../../store/useTestStore'

export function AddQuestionModal() {
  const [opened, { open, close }] = useDisclosure(false)
  const addQuestion = useTestStore((s) => s.addQuestion)

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
    const prepared = {
      id: Date.now(),
      question: values.question,
      options: values.options.map((opt, i) => ({
        id: i,
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
    }
    addQuestion(prepared)
    form.reset()
    close()
  })

  return (
    <>
      <Button onClick={open}>Добавить вопрос</Button>

      <Modal opened={opened} onClose={close} title="Добавить вопрос" size="lg">
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
                  <Group key={index} align="center" >
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
              <Button type="submit">Сохранить</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  )
}
