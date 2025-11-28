import { useCallback, useState } from 'react'
import {
  getUsuariosRegistrados,
  saveUsuariosRegistrados,
} from '../utils/usuariosStorage.js'

const INITIAL_FORM = {
  nome: '',
  sobrenome: '',
  cpf: '',
  dataNascimento: '',
  genero: '',
  email: '',
  senha: '',
  confirmarSenha: '',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CPF_REGEX = /^\d{11}$/

function gerarIdentificador() {
  if (typeof globalThis !== 'undefined' && globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID()
  }
  return String(Date.now())
}

function validarFormulario(formData) {
  const errors = {}

  if (!formData.nome.trim()) {
    errors.nome = 'Informe seu nome.'
  }

  if (!formData.sobrenome.trim()) {
    errors.sobrenome = 'Informe seu sobrenome.'
  }

  if (!CPF_REGEX.test(formData.cpf)) {
    errors.cpf = 'CPF deve conter 11 dígitos numéricos.'
  }

  if (!formData.dataNascimento) {
    errors.dataNascimento = 'Informe sua data de nascimento.'
  } else {
    const dataSelecionada = new Date(formData.dataNascimento)
    const hoje = new Date()
    if (dataSelecionada > hoje) {
      errors.dataNascimento = 'Data de nascimento não pode ser futura.'
    }
  }

  if (!formData.genero) {
    errors.genero = 'Selecione um gênero.'
  }

  if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = 'Informe um e-mail válido.'
  }

  if (formData.senha.length < 6) {
    errors.senha = 'A senha deve ter pelo menos 6 caracteres.'
  }

  if (!formData.confirmarSenha.trim()) {
    errors.confirmarSenha = 'Confirme sua senha.'
  } else if (formData.senha !== formData.confirmarSenha) {
    errors.confirmarSenha = 'As senhas precisam ser iguais.'
  }

  return errors
}

function normalizarCpf(valor) {
  return valor.replace(/\D/g, '').slice(0, 11)
}

function useCadastroForm() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [submissionError, setSubmissionError] = useState('')

  const handleChange = useCallback((event) => {
    const { name, value } = event.target
    const novoValor = name === 'cpf' ? normalizarCpf(value) : value

    setFormData((prev) => ({
      ...prev,
      [name]: novoValor,
    }))

    setErrors((prev) => {
      if (!prev[name]) return prev
      const { [name]: _, ...rest } = prev
      return rest
    })
    setSuccessMessage('')
    setSubmissionError('')
  }, [])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      setSuccessMessage('')
      setSubmissionError('')

      const validationErrors = validarFormulario(formData)
      setErrors(validationErrors)
      if (Object.keys(validationErrors).length > 0) {
        return
      }

      try {
        const usuariosRegistrados = getUsuariosRegistrados()
        const emailNormalizado = formData.email.trim().toLowerCase()
        const emailJaExiste = usuariosRegistrados.some(
          (usuario) => usuario.email?.toLowerCase() === emailNormalizado,
        )
        const cpfJaExiste = usuariosRegistrados.some(
          (usuario) => usuario.cpf === formData.cpf,
        )

        if (emailJaExiste || cpfJaExiste) {
          const novosErros = {}
          if (emailJaExiste) {
            novosErros.email = 'Já existe um cadastro com este e-mail.'
          }
          if (cpfJaExiste) {
            novosErros.cpf = 'Já existe um cadastro com este CPF.'
          }
          setErrors((prev) => ({ ...prev, ...novosErros }))
          return
        }

        const novoUsuario = {
          id: gerarIdentificador(),
          nome: formData.nome.trim(),
          sobrenome: formData.sobrenome.trim(),
          cpf: formData.cpf,
          dataNascimento: formData.dataNascimento,
          genero: formData.genero,
          email: formData.email.trim(),
          senha: formData.senha,
          username: formData.email.trim(),
        }

        saveUsuariosRegistrados([...usuariosRegistrados, novoUsuario])

        setSuccessMessage('Cadastro realizado com sucesso! Faça login para continuar.')
        setFormData(INITIAL_FORM)
        setErrors({})
      } catch (error) {
        console.error(error)
        setSubmissionError('Não foi possível salvar seus dados. Tente novamente.')
      }
    },
    [formData],
  )

  return {
    formData,
    errors,
    successMessage,
    submissionError,
    handleChange,
    handleSubmit,
  }
}

export { useCadastroForm }

