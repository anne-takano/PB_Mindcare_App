import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext.jsx'
import styles from './Home.module.css'
import { Card } from '../components/Card.jsx'
import { Logo } from '../components/Logo.jsx'
import { Heading } from '@chakra-ui/react'
import { AvatarRoot, AvatarFallback } from '@chakra-ui/react/avatar'
import { BottomNav } from '../components/BottomNav.jsx'
import { QuickActionCard } from '../components/QuickActionCard.jsx'
import { MapPin, CalendarDays, ReceiptText, Users, FileText } from 'lucide-react'
import { useLogoutAction } from '../hooks/useLogoutAction.js'

const quickActionsPaciente = [
  {
    title: 'Buscar terapeutas',
    description: 'Encontre profissionais próximos de você.',
    icon: MapPin,
    path: '/buscar-terapeutas',
  },
  {
    title: 'Consultar agendamentos',
    description: 'Visualize suas sessões marcadas.',
    icon: CalendarDays,
    path: '/consultar-agendamentos',
  },
  {
    title: 'Solicitar reembolso',
    description: 'Envie o comprovante para reembolso.',
    icon: ReceiptText,
    path: '/solicitar-reembolso',
  },
]

const quickActionsTerapeuta = [
  {
    title: 'Meus pacientes',
    description: 'Gerencie sua carteira e contatos.',
    icon: Users,
    path: '/meus-pacientes',
  },
  {
    title: 'Agenda',
    description: 'Confirme sessões e encaixes.',
    icon: CalendarDays,
    path: '/consultar-agendamentos',
  },
  {
    title: 'Prontuários',
    description: 'Atualize evoluções e anexos.',
    icon: FileText,
    path: '/consultar-agendamentos',
  },
]

function Home() {
  const { usuario } = useUsuario()
  const navigate = useNavigate()
  const handleLogout = useLogoutAction()

  useEffect(() => {
    if (!usuario) {
      navigate('/login', { replace: true })
    }
  }, [usuario, navigate])

  const isTerapeuta = Boolean(usuario?.isTerapeuta)
  const quickActions = isTerapeuta ? quickActionsTerapeuta : quickActionsPaciente

  const nomeESobrenome = (() => {
    if (!usuario) return 'Não informado'
    const nomeCompleto = [usuario?.nome, usuario?.sobrenome].filter(Boolean).join(' ').trim()
    return nomeCompleto || usuario?.nome || usuario?.sobrenome || 'Não informado'
  })()

  const cpf = usuario?.cpf ?? 'Não informado'

  const dataNascimento = (() => {
    if (!usuario?.dataNascimento) return 'Não informado'
    try {
      const data = new Date(`${usuario.dataNascimento}T00:00:00`)
      return data.toLocaleDateString('pt-BR')
    } catch (error) {
      console.error('Não foi possível formatar a data de nascimento.', error)
      return usuario.dataNascimento
    }
  })()

  const cidadeEstado = (() => {
    if (!usuario) return 'Não informado'
    if (usuario.cidade && usuario.estado) {
      return `${usuario.cidade} (${usuario.estado})`
    }
    return usuario.cidade ?? usuario.estado ?? 'Não informado'
  })()

  if (!usuario) {
    return null
  }

  if (isTerapeuta) {
    return (
      <div className={styles.homeWrapper}>
        <main className={styles.homePage}>
          <Logo className={styles.logo} variant="white" />

          <Card className={styles.terapeutaCard}>
            <Heading as="h2" size="lg">
              Bem-vindo(a), {nomeESobrenome || 'Terapeuta'}
            </Heading>
            <p className={styles.homeSubtitle}>
              Acompanhe seus atendimentos e mantenha sua agenda organizada.
            </p>
            <ul className={styles.terapeutaList}>
              <li>Próximos atendimentos confirmados para esta semana.</li>
              <li>Revise os prontuários após cada sessão e atualize os feedbacks.</li>
              <li>Use as ações rápidas para ajustar agenda ou conversar com pacientes.</li>
            </ul>
          </Card>

          <Card as="section" className={styles.quickActionsCard} variant="fluid">
            <Heading as="h2" className={styles.quickActionsHeader}>
              Suas ações rápidas
            </Heading>
            <div className={styles.quickActionsGrid}>
              {quickActions.map((action) => (
                <QuickActionCard
                  key={action.title}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  onClick={() => navigate(action.path)}
                  role="button"
                />
              ))}
            </div>
          </Card>
        </main>

        <BottomNav onLogout={handleLogout} />
      </div>
    )
  }

  return (
    <div className={styles.homeWrapper}>
        <main className={styles.homePage}>
       <Logo className={styles.logo} variant="white" />
        <Card as="section" className={styles.homeCard}>
          <section className={styles.userData}>
            <div className={styles.avatarWrapper}>
              <AvatarRoot size="2xl" colorPalette="orange">
                <AvatarFallback/>
              </AvatarRoot>
            </div>

            <div className={styles.dataContainer}>
              <div className={styles.dataItem}>
                <span className={styles.dataValue}>
                  <strong>{nomeESobrenome}</strong>
                </span>
              </div>

              <div className={styles.dataItem}>
                <span className={styles.dataValue}>
                  <strong>CPF:</strong> {cpf}
                </span>
              </div>

              <div className={styles.dataItem}>
                <span className={styles.dataValue}>
                  <strong>Data de nascimento:</strong> {dataNascimento}
                </span>
              </div>

              <div className={styles.dataItem}>
                <span className={styles.dataValue}>
                  <strong>Cidade:</strong> {cidadeEstado}
                </span>
              </div>
            </div>
          </section>
        </Card>

        <Card as="section" className={styles.quickActionsCard} variant="fluid">
          <Heading as="h2" className={styles.quickActionsHeader}>O que você precisa hoje?</Heading>
          <div className={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <QuickActionCard
                key={action.title}
                icon={action.icon}
                title={action.title}
                description={action.description}
                onClick={() => navigate(action.path)}
                role="button"
              />
            ))}
          </div>
        </Card>
      </main>

      <BottomNav onLogout={handleLogout} />
    </div>
  )
}

export default Home

