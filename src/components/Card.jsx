import { forwardRef } from 'react'
import { CardRoot } from '@chakra-ui/react'
import styles from './Card.module.css'

const Card = forwardRef(({ className = '', variant = 'default', ...props }, ref) => {
  const variantClass = variant === 'fluid' ? styles.cardFluid : ''

  return (
    <CardRoot
      ref={ref}
      className={[styles.card, variantClass, className].filter(Boolean).join(' ')}
      {...props}
    />
  )
})

Card.displayName = 'Card'

export { Card }

