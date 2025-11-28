import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext.jsx'

function useLogoutAction() {
  const { usuario, logout } = useUsuario()
  const navigate = useNavigate()

  return useCallback(() => {
    try {
      localStorage.removeItem('agendamentoSelecionado')
      if (usuario?.id) {
        localStorage.removeItem(`agendamentos_terapeuta_${usuario.id}`)
      }
      if (usuario?.nome) {
        localStorage.removeItem(`agendamentos_terapeuta_${usuario.nome}`)
      }
    } catch (error) {
      console.error('Erro ao limpar o armazenamento local.', error)
    }
    logout()
    navigate('/login')
  }, [usuario, logout, navigate])
}

export { useLogoutAction }

