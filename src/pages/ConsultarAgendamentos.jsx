import { useState } from 'react'
import styles from './ConsultarAgendamentos.module.css'
import { Card } from '../components/Card.jsx'
import { Logo } from '../components/Logo.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { Heading } from '@chakra-ui/react'
import { AvatarRoot, AvatarFallback } from '@chakra-ui/react/avatar'
import { Button } from '../components/Button.jsx'
import { useLogoutAction } from '../hooks/useLogoutAction.js'

function ConsultarAgendamentos() {
  const [agendamento, setAgendamento] = useState(() => {
    try {
      const stored = localStorage.getItem('agendamentoSelecionado')
      return stored ? JSON.parse(stored) : null
    } catch (error) {
      console.error('Não foi possível carregar o agendamento.', error)
      return null
    }
  })

  const handleCancelar = () => {
    try {
      localStorage.removeItem('agendamentoSelecionado')
    } catch (error) {
      console.error('Não foi possível remover o agendamento.', error)
    }
    setAgendamento(null)
  }

  const handleLogout = useLogoutAction()

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Logo className={styles.logo} variant="white" />

        <Card className={styles.card}>
          <Heading as="h1" size="lg">
            Consultar agendamentos
          </Heading>

          {agendamento ? (
            <Card as="section" className={styles.agendamentoCard} variant="fluid">
              <div className={styles.cardHeader}>
                <AvatarRoot colorPalette="orange">
                  <AvatarFallback>
                    {agendamento.nome?.charAt(0)?.toUpperCase() ?? 'T'}
                  </AvatarFallback>
                </AvatarRoot>
                <div>
                  <p className={styles.therapistName}>{agendamento.nome}</p>
                  <p className={styles.specialty}>{agendamento.especialidade}</p>
                </div>
              </div>
              <p className={styles.infoRow}>
                <strong>CRP:</strong> {agendamento.crp}
              </p>
              <p className={styles.infoRow}>
                <strong>Horário selecionado:</strong> {agendamento.horarioSelecionado}
              </p>
              <p className={styles.infoRow}>
                <strong>Data:</strong>{' '}
                {new Date(agendamento.proximaDataDisponivel).toLocaleDateString('pt-BR')}
              </p>
              <p className={styles.description}>
                Avaliação {agendamento.avaliacao} ({agendamento.numeroAvaliacoes} avaliações) •
                Primeira consulta R$ {agendamento.valorPrimeiraConsulta}
              </p>

              <div className={styles.cancelButton}>
                <Button type="button" onClick={handleCancelar}>
                  Cancelar agendamento
                </Button>
              </div>
            </Card>
          ) : (
            <p className={styles.description}>
              Você ainda não selecionou nenhuma consulta. Ao marcar uma sessão, ela aparecerá aqui.
            </p>
          )}
        </Card>
      </main>
      <BottomNav onLogout={handleLogout} />
    </div>
  )
}

export default ConsultarAgendamentos

