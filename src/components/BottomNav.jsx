import { useLocation, useNavigate } from 'react-router-dom'
import { Home, UserRound, LogOut } from 'lucide-react'
import styles from './BottomNav.module.css'

const NAV_ITEMS = [
  {
    key: 'home',
    label: 'Home',
    icon: Home,
    path: '/home',
  },
  {
    key: 'profile',
    label: 'Perfil',
    icon: UserRound,
    path: '/perfil',
  },
]

function BottomNav({ onLogout = () => {} }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className={styles.navbar}>
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon
        const isActive = location.pathname === item.path
        return (
          <button
            key={item.key}
            type="button"
            className={`${styles.navButton}${isActive ? ` ${styles.navButtonActive}` : ''}`}
            onClick={() => navigate(item.path)}
          >
            <Icon />
            <span>{item.label}</span>
          </button>
        )
      })}

      <button
        type="button"
        className={styles.navButton}
        onClick={onLogout}
      >
        <LogOut />
        <span>Sair</span>
      </button>
    </nav>
  )
}

export { BottomNav }

