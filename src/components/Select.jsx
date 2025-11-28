import { forwardRef } from 'react'
import {
  NativeSelectField,
  NativeSelectIndicator,
  NativeSelectRoot,
} from '@chakra-ui/react/native-select'
import styles from './Select.module.css'

const Select = forwardRef(({ placeholder, children, ...props }, ref) => {
  return (
    <NativeSelectRoot>
      <NativeSelectField
        ref={ref}
        placeholder={placeholder}
        className={styles.field}
        {...props}
      >
        {children}
      </NativeSelectField>
      <NativeSelectIndicator className={styles.indicator} />
    </NativeSelectRoot>
  )
})

Select.displayName = 'Select'

export { Select }

