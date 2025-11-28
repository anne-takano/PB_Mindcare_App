import { useEffect, useMemo, useState } from 'react'
import styles from './BuscarTerapeutas.module.css'
import { Card } from '../components/Card.jsx'
import { Logo } from '../components/Logo.jsx'
import { BottomNav } from '../components/BottomNav.jsx'
import { Heading } from '@chakra-ui/react'
import { Input } from '../components/Input.jsx'
import { AvatarRoot, AvatarFallback } from '@chakra-ui/react/avatar'
import { Button } from '../components/Button.jsx'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext.jsx'
import { useLogoutAction } from '../hooks/useLogoutAction.js'

function BuscarTerapeutas() {
  const [terapeutas, setTerapeutas] = useState([])
  const [busca, setBusca] = useState('')
  const [selectedHorarios, setSelectedHorarios] = useState({})
  const [errors, setErrors] = useState({})
  const [carregando, setCarregando] = useState(true)
  const navigate = useNavigate()
  const { usuario: paciente } = useUsuario()
  const handleLogout = useLogoutAction()

  useEffect(() => {
    async function carregarTerapeutas() {
      try {
        setCarregando(true)
        const response = await fetch('/usuarios.json')
        if (!response.ok) throw new Error('Não foi possível carregar os usuários.')
        const data = await response.json()
        const terapeutasAtivos = data.filter((usuario) => usuario.isTerapeuta)
        setTerapeutas(terapeutasAtivos)
      } catch (error) {
        console.error(error)
      } finally {
        setCarregando(false)
      }
    }

    carregarTerapeutas()
  }, [])

  const terapeutasFiltrados = useMemo(() => {
    if (!busca.trim()) return terapeutas
    const termo = busca.trim().toLowerCase()
    return terapeutas.filter((terapeuta) => terapeuta.nome.toLowerCase().includes(termo))
  }, [terapeutas, busca])

  const handleHorarioSelecionado = (terapeutaId, horario) => {
    setSelectedHorarios((prev) => ({
      ...prev,
      [terapeutaId]: horario,
    }))
    setErrors((prev) => {
      if (!prev[terapeutaId]) return prev
      const { [terapeutaId]: _, ...rest } = prev
      return rest
    })
  }

  const handleMarcarConsulta = (terapeuta) => {
    const horarioSelecionado = selectedHorarios[terapeuta.id]
    if (!horarioSelecionado) {
      setErrors((prev) => ({
        ...prev,
        [terapeuta.id]: 'Selecione um horário.',
      }))
      return
    }

    const agendamento = {
      ...terapeuta,
      horarioSelecionado,
    }

    try {
      localStorage.setItem('agendamentoSelecionado', JSON.stringify(agendamento))

      const key = `agendamentos_terapeuta_${terapeuta.id}`
      const agendamentosExistentes = JSON.parse(localStorage.getItem(key)) ?? []
      const registroParaTerapeuta = {
        terapeutaId: terapeuta.id,
        terapeutaNome: terapeuta.nome,
        terapeutaEspecialidade: terapeuta.especialidade,
        pacienteId: paciente?.id ?? null,
        pacienteNome: paciente?.nome ?? 'Paciente',
        pacienteEmail: paciente?.email ?? '',
        horarioSelecionado,
        proximaDataDisponivel: terapeuta.proximaDataDisponivel,
      }
      localStorage.setItem(key, JSON.stringify([...agendamentosExistentes, registroParaTerapeuta]))
    } catch (error) {
      console.error('Não foi possível salvar o agendamento.', error)
    }
    navigate('/consultar-agendamentos')
  }

  return (
    <div className={styles.page}>
      <main className={styles.content}>
      <Logo className={styles.logo} variant="white" />

        <Card className={styles.card}>
          <Heading as="h1" size="lg" textAlign="center" color="#f37221">
            Buscar terapeutas:
          </Heading>
          <Input
              id="busca"
              name="busca"
              type="text"
              placeholder="Digite o nome do terapeuta"
              value={busca}
              onChange={(event) => setBusca(event.target.value)}
            />
            </Card>

            {carregando && <p className={styles.loading}>Carregando terapeutas...</p>}
            {!carregando && terapeutasFiltrados.map((terapeuta) => (
              <Card key={terapeuta.id} as="article" data-testid={`therapist-card-${terapeuta.id}`} className={styles.therapistCard} variant="fluid">
                <div className={styles.cardHeader}>
                  <AvatarRoot colorPalette="orange">
                    <AvatarFallback>
                      {terapeuta.nome?.charAt(0)?.toUpperCase() ?? 'T'}
                    </AvatarFallback>
                  </AvatarRoot>
                  <div>
                    <p className={styles.therapistName}>{terapeuta.nome}</p>
                    <p className={styles.specialty}>{terapeuta.especialidade}</p>
                  </div>
                </div>

                <p className={styles.infoRow}>
                  <strong>CRP:</strong> {terapeuta.crp}
                </p>

                <p className={styles.infoRow}>
                  <strong>Avaliação:</strong> {terapeuta.avaliacao} (
                  {terapeuta.numeroAvaliacoes} avaliações)
                </p>

                <div className={styles.badgeList}>
                  <span className={styles.badge}>
                    Primeira consulta R$ {terapeuta.valorPrimeiraConsulta}
                  </span>
                  <span className={styles.badge}>
                    Próxima data {new Date(terapeuta.proximaDataDisponivel).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <p className={styles.infoRow}>
                <strong>Horários disponíveis:</strong>
                </p>
                <div className={styles.scheduleList}>
                  {terapeuta.horariosDisponiveis.map((horario) => {
                    const isActive = selectedHorarios[terapeuta.id] === horario
                    return (
                      <button
                        key={horario}
                        type="button"
                        className={`${styles.scheduleButton}${isActive ? ` ${styles.scheduleButtonActive}` : ''}`}
                        onClick={() => handleHorarioSelecionado(terapeuta.id, horario)}
                      >
                        {horario}
                      </button>
                    )
                  })}
                </div>

                {errors[terapeuta.id] && (
                  <p className={styles.scheduleError}>{errors[terapeuta.id]}</p>
                )}

                <Button type="button" onClick={() => handleMarcarConsulta(terapeuta)}>
                  Marcar consulta
                </Button>
              </Card>
            ))}
      </main>
      <BottomNav onLogout={handleLogout} />
    </div>
  )
}

export default BuscarTerapeutas

