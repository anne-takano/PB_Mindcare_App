import { forwardRef } from 'react'
import styles from './QuickActionCard.module.css'

const QuickActionCard = forwardRef(({ icon: Icon, title, description, className = '', ...props }, ref) => {
  return (
    <article ref={ref} className={`${styles.card}${className ? ` ${className}` : ''}`} {...props}>
      {Icon ? <Icon className={styles.icon} size={28} /> : null}
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </article>
  )
})

QuickActionCard.displayName = 'QuickActionCard'

export { QuickActionCard }

