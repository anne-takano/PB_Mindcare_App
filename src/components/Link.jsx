import { forwardRef } from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'
import styles from './Link.module.css'

const Link = forwardRef(({ className = '', ...props }, ref) => {
  return (
    <ChakraLink
      ref={ref}
      className={`${styles.link}${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
})

Link.displayName = 'Link'

export { Link }

