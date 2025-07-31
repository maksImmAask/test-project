import { Button } from '@mantine/core'
import type { ButtonProps } from '@mantine/core'
import { useState } from 'react'
type LoadingButtonProps = ButtonProps & {
  onAsyncClick: (e?: React.MouseEvent<HTMLButtonElement>) => Promise<void>
}

export function LoadingButton({ onAsyncClick, children, ...props }: LoadingButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      setLoading(true)
      await onAsyncClick(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button {...props} onClick={handleClick} loading={loading}>
      {children}
    </Button>
  )
}
