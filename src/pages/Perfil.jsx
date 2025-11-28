import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext.jsx'
import styles from './Perfil.module.css'
import { Card } from '../components/Card.jsx'
import { Heading1 } from '../components/Heading1.jsx'
import { Logo } from '../components/Logo.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { AvatarRoot, AvatarFallback, AvatarImage } from '@chakra-ui/react/avatar'
import { useLogoutAction } from '../hooks/useLogoutAction.js'

function Perfil() {
  const { usuario } = useUsuario()
  const navigate = useNavigate()
  const handleLogout = useLogoutAction()

  useEffect(() => {
    if (!usuario) {
      navigate('/login', { replace: true })
    }
  }, [usuario, navigate])

  if (!usuario) {
    return null
  }

  const infoItems = [
    { label: 'Nome completo', value: `${usuario.nome ?? ''} ${usuario.sobrenome ?? ''}`.trim() || 'Não informado' },
    { label: 'Usuário', value: usuario.username ?? 'Não informado' },
    { label: 'E-mail', value: usuario.email ?? 'Não informado' },
    { label: 'CPF', value: usuario.cpf ?? 'Não informado' },
    {
      label: 'Data de nascimento',
      value: usuario.dataNascimento
        ? new Date(`${usuario.dataNascimento}T00:00:00`).toLocaleDateString('pt-BR')
        : 'Não informado',
    },
    { label: 'Gênero', value: usuario.genero ?? 'Não informado' },
    { label: 'Cidade', value: usuario.cidade ?? 'Não informado' },
    { label: 'Estado', value: usuario.estado ?? 'Não informado' },
  ]

  return (
    <div className={styles.perfilWrapper}>
      <main className={styles.perfilMain}>
        <Card as="section" className={styles.perfilCard}>
          <div className={styles.perfilHeader}>
            <Logo />
            <Heading1>Seu perfil</Heading1>
            <p className={styles.perfilSubtitle}>Resumo das informações cadastradas</p>
          </div>

          <div className={styles.perfilAvatar}>
            <AvatarRoot size="2xl" colorPalette="orange">
              <AvatarFallback>{usuario?.nome?.charAt(0)?.toUpperCase() ?? 'U'}</AvatarFallback>
              <AvatarImage src="https://bit.ly/broken-link" alt={usuario?.nome ?? 'Usuário'} />
            </AvatarRoot>
          </div>

          <div className={styles.infoGrid}>
            {infoItems.map((item) => (
              <div key={item.label} className={styles.infoItem}>
                <span className={styles.infoLabel}>{item.label}</span>
                <span className={styles.infoValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </main>

      <BottomNav onLogout={handleLogout} />
    </div>
  )
}

export default Perfil

