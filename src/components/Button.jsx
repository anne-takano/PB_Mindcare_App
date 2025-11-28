import { forwardRef } from 'react'
import { Button as ChakraButton } from '@chakra-ui/react'
import styles from './Button.module.css'

const Button = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <ChakraButton
      ref={ref}
      className={`${styles.button}${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
})

Button.displayName = 'Button'

export { Button }
