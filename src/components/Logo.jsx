import { Image } from '@chakra-ui/react'
import styles from './Logo.module.css'
import MindCareLogo from '../assets/MindCare.png'
import MindCareLogoWhite from '../assets/MindCare_white.png'

function Logo({ className = '', variant = 'default', ...props }) {
  const src = variant === 'white' ? MindCareLogoWhite : MindCareLogo

  return (
    <Image
      src={src}
      alt="MindCare"
      className={`${styles.logo}${className ? ` ${className}` : ''}`}
      {...props}
    />
  )
}

export { Logo }

