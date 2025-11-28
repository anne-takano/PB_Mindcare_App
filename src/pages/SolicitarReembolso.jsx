import styles from './SolicitarReembolso.module.css'
import { Card } from '../components/Card.jsx'
import { Logo } from '../components/Logo.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { Heading } from '@chakra-ui/react'
import { useLogoutAction } from '../hooks/useLogoutAction.js'

function SolicitarReembolso() {
  const handleLogout = useLogoutAction()

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Logo className={styles.logo} variant="white" />

        <Card className={styles.card}>
          <Heading as="h1" size="lg">
            Solicitar reembolso
          </Heading>
          <p className={styles.description}>
            Envie os comprovantes das suas sessões e acompanhe o status de análise por aqui.
          </p>

          <ul className={styles.steps}>
            <li className={styles.stepItem}>1. Separe o recibo da sessão e o comprovante de pagamento.</li>
            <li className={styles.stepItem}>2. Faça upload dos arquivos no botão abaixo ou envie por e-mail.</li>
            <li className={styles.stepItem}>3. Acompanhe os prazos e notificações nesta tela.</li>
          </ul>
        </Card>
      </main>
      <BottomNav onLogout={handleLogout} />
    </div>
  )
}

export default SolicitarReembolso

