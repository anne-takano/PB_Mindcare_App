import { useMemo } from 'react'
import styles from './MeusPacientes.module.css'
import { Card } from '../components/Card.jsx'
import { Logo } from '../components/Logo.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { Heading } from '@chakra-ui/react'
import { AvatarRoot, AvatarFallback } from '@chakra-ui/react/avatar'
import { useUsuario } from '../context/UsuarioContext.jsx'
import { useLogoutAction } from '../hooks/useLogoutAction.js'

function MeusPacientes() {
  const { usuario } = useUsuario()
  const handleLogout = useLogoutAction()
  const agendamentos = useMemo(() => {
    if (!usuario) return []
    try {
      const keyById = usuario.id ? `agendamentos_terapeuta_${usuario.id}` : null
      const keyByName = usuario.nome ? `agendamentos_terapeuta_${usuario.nome}` : null
      const raw =
        (keyById && localStorage.getItem(keyById)) ??
        (keyByName && localStorage.getItem(keyByName))
      return raw ? JSON.parse(raw) : []
    } catch (error) {
      console.error('Não foi possível carregar os agendamentos dos pacientes.', error)
      return []
    }
  }, [usuario])

  return (
    <div className={styles.page}>
      <main className={styles.content}>
        <Logo className={styles.logo} variant="white" />

        <Card className={styles.card}>
          <Heading as="h1" size="lg">
            Meus pacientes
          </Heading>
          <p className={styles.description}>
            Visão geral dos pacientes que marcaram consultas com você recentemente.
          </p>

          {agendamentos.length === 0 ? (
            <p className={styles.description}>
              Ainda não há consultas registradas. Assim que um paciente marcar com você, o resumo
              aparecerá aqui.
            </p>
          ) : (
            <div className={styles.patientsGrid}>
              {agendamentos.map((item, index) => (
                <Card key={`${item.pacienteNome}-${index}`} className={styles.patientCard} variant="fluid">
                  <div className={styles.patientHeader}>
                    <AvatarRoot colorPalette="orange">
                      <AvatarFallback>
                        {item.pacienteNome?.charAt(0)?.toUpperCase() ?? 'P'}
                      </AvatarFallback>
                    </AvatarRoot>
                    <div>
                      <p className={styles.patientName}>{item.pacienteNome}</p>
                      <p className={styles.patientInfo}>{item.pacienteEmail}</p>
                    </div>
                  </div>
                  <p className={styles.patientInfo}>
                    <strong>Data:</strong> {new Date(item.proximaDataDisponivel).toLocaleDateString('pt-BR')}
                  </p>
                  <p className={styles.patientInfo}>
                    <strong>Horário:</strong> {item.horarioSelecionado}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </Card>
      </main>
      <BottomNav onLogout={handleLogout} />
    </div>
  )
}

export default MeusPacientes

