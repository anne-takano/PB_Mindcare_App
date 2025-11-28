import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUsuario } from '../context/UsuarioContext.jsx'
import { getUsuariosRegistrados } from '../utils/usuariosStorage.js'

function normalizarIdentificador(valor) {
  return valor.trim().toLowerCase()
}

async function buscarUsuariosPadrao() {
  const resposta = await fetch('/usuarios.json')
  if (!resposta.ok) {
    throw new Error('Não foi possível carregar os usuários.')
  }
  return resposta.json()
}

function encontrarUsuario(todosUsuarios, identificador, senha) {
  return todosUsuarios.find((usuario) => {
    const identificadores = [usuario.username, usuario.email]
    const identificadoresNormalizados = identificadores
      .filter(Boolean)
      .map((valor) => valor.trim().toLowerCase())

    return (
      identificadoresNormalizados.includes(identificador) &&
      usuario.senha === senha
    )
  })
}

function useLoginForm() {
  const { login } = useUsuario()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)

  const handleUsernameChange = useCallback((event) => {
    setUsername(event.target.value)
  }, [])

  const handleSenhaChange = useCallback((event) => {
    setSenha(event.target.value)
  }, [])

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault()
      setErro('')
      setCarregando(true)

      try {
        const usuariosPadrao = await buscarUsuariosPadrao()
        const usuariosRegistrados = getUsuariosRegistrados()
        const todosUsuarios = [...usuariosPadrao, ...usuariosRegistrados]
        const identificador = normalizarIdentificador(username)

        const usuarioValido = encontrarUsuario(todosUsuarios, identificador, senha)

        if (!usuarioValido) {
          setErro('Usuário/e-mail ou senha inválidos.')
          return
        }

        login(usuarioValido)
        navigate('/home')
      } catch (error) {
        setErro(error.message ?? 'Erro inesperado. Tente novamente.')
      } finally {
        setCarregando(false)
      }
    },
    [username, senha, login, navigate],
  )

  return {
    username,
    senha,
    erro,
    carregando,
    handleUsernameChange,
    handleSenhaChange,
    handleSubmit,
  }
}

export { useLoginForm }

