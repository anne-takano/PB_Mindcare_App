import { Heading } from '@chakra-ui/react'

function Heading1({ children, ...props }) {
  return (
    <Heading as="h1" size="2xl" {...props}>
      {children}
    </Heading>
  )
}

export { Heading1 }

