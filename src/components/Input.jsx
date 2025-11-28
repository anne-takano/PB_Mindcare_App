import { forwardRef } from 'react'
import { Input as ChakraInput } from '@chakra-ui/react'
import styles from './Input.module.css'

const Input = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <ChakraInput
      ref={ref}
      className={`${styles.input}${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }

