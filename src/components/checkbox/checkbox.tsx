import { Checkbox } from '@mantine/core'

type AnswerCheckboxProps = {
  isCorrect: boolean
  onChange?: (checked: boolean) => void
}

export const AnswerCheckbox = ({  isCorrect, onChange }: AnswerCheckboxProps) => {
  return (
    <Checkbox
      checked={isCorrect}
      style={{margin: '20px'}}
      disabled={isCorrect} 
      onChange={(event) => {
        if (!isCorrect && onChange) {
          onChange(event.currentTarget.checked)
        }
      }}
    />
  )
}
