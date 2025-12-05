import { useCallback, useState } from 'react'
import {
  getUsuariosRegistrados,
  saveUsuariosRegistrados,
} from '../utils/usuariosStorage.js'

const INITIAL_FORM = {
  nome: '',
  sobrenome: '',
  cpf: '',
  crp: '',
  isTerapeuta: false,
  dataNascimento: '',
  genero: '',
  email: '',
  senha: '',
  confirmarSenha: '',
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const CPF_REGEX = /^\d{11}$/
const CRP_REGEX = /^\d{2}\/\d{5}$/

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

  if (formData.isTerapeuta) {
    if (!CRP_REGEX.test(formData.crp)) {
      errors.crp = 'Informe um CRP válido no formato 12/34567.'
    }
  } else if (!CPF_REGEX.test(formData.cpf)) {
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

function normalizarCrp(valor) {
  const apenasDigitos = valor.replace(/\D/g, '').slice(0, 7)
  if (apenasDigitos.length <= 2) {
    return apenasDigitos
  }
  const prefixo = apenasDigitos.slice(0, 2)
  const sufixo = apenasDigitos.slice(2)
  return `${prefixo}/${sufixo}`
}

function useCadastroForm() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')
  const [submissionError, setSubmissionError] = useState('')

  const handleChange = useCallback((event) => {
    const { name, value, type, checked } = event.target
    let novoValor = value

    if (name === 'cpf') {
      novoValor = normalizarCpf(value)
    } else if (name === 'crp') {
      novoValor = normalizarCrp(value)
    } else if (type === 'checkbox') {
      novoValor = checked
    }

    setFormData((prev) => ({
      ...prev,
      [name]: novoValor,
    }))

    setErrors((prev) => {
      if (name === 'isTerapeuta') {
        const { cpf, crp, ...rest } = prev
        return rest
      }
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
        const cpfJaExiste =
          !formData.isTerapeuta && formData.cpf
            ? usuariosRegistrados.some((usuario) => usuario.cpf === formData.cpf)
            : false
        const crpJaExiste = formData.isTerapeuta
          ? usuariosRegistrados.some((usuario) => usuario.crp === formData.crp)
          : false

        if (emailJaExiste || cpfJaExiste || crpJaExiste) {
          const novosErros = {}
          if (emailJaExiste) {
            novosErros.email = 'Já existe um cadastro com este e-mail.'
          }
          if (cpfJaExiste) {
            novosErros.cpf = 'Já existe um cadastro com este CPF.'
          }
          if (crpJaExiste) {
            novosErros.crp = 'Já existe um cadastro com este CRP.'
          }
          setErrors((prev) => ({ ...prev, ...novosErros }))
          return
        }

        const novoUsuario = {
          id: gerarIdentificador(),
          nome: formData.nome.trim(),
          sobrenome: formData.sobrenome.trim(),
          dataNascimento: formData.dataNascimento,
          genero: formData.genero,
          email: formData.email.trim(),
          senha: formData.senha,
          username: formData.email.trim(),
          isTerapeuta: formData.isTerapeuta,
        }

        if (formData.isTerapeuta) {
          novoUsuario.crp = formData.crp
        } else {
          novoUsuario.cpf = formData.cpf
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

