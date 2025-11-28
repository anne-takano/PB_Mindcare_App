import { Link as RouterLink } from 'react-router-dom'
import {
  AlertIndicator,
  AlertRoot,
  CardBody,
  CardFooter,
  CardHeader,
  Field,
  Image,
  Text,
} from '@chakra-ui/react'
import styles from './Cadastro.module.css'
import { useCadastroForm } from '../hooks/useCadastroForm.js'
import MindCareLogo from '../assets/MindCare.png'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { Link } from '../components/Link.jsx'
import { Heading1 } from '../components/Heading1.jsx'
import { Select } from '../components/Select.jsx'
import { Card } from '../components/Card.jsx'
import { Logo } from '../components/Logo.jsx'

const GENEROS = [
  { value: 'feminino', label: 'Feminino' },
  { value: 'masculino', label: 'Masculino' },
  { value: 'nao-binario', label: 'Não-binário' },
  { value: 'outro', label: 'Outro' },
  { value: 'prefiro-nao-informar', label: 'Prefiro não informar' },
]

function Cadastro() {
  const {
    formData,
    errors,
    successMessage,
    submissionError,
    handleChange,
    handleSubmit,
  } = useCadastroForm()

  return (
    <main className={styles.cadastroMain}>
      <Card as="section" className={styles.cadastroCard}>
        <CardHeader className={styles.cardHeader}>
          <Logo />
          <Heading1>Crie sua conta</Heading1>
          <Text className={styles.cardDescription}>
            Preencha os campos abaixo para criar sua conta.
          </Text>
        </CardHeader>

        <CardBody>
          <form className={styles.registerForm} onSubmit={handleSubmit} noValidate>
            <div className={styles.formGrid}>
              <Field.Root className={styles.field} required>
                <Field.Label>Nome</Field.Label>
                <Input
                  id="nome"
                  name="nome"
                  type="text"
                  autoComplete="given-name"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Ana"
                />
                {errors.nome && <span className={styles.errorText}>{errors.nome}</span>}
              </Field.Root>

              <Field.Root className={styles.field} required>
                <Field.Label>Sobrenome</Field.Label>
                <Input
                  id="sobrenome"
                  name="sobrenome"
                  type="text"
                  autoComplete="family-name"
                  value={formData.sobrenome}
                  onChange={handleChange}
                  placeholder="Ex: Silva"
                />
                {errors.sobrenome && (
                  <span className={styles.errorText}>{errors.sobrenome}</span>
                )}
              </Field.Root>

              <Field.Root className={styles.field} required>
                <Field.Label>CPF</Field.Label>
                <Input
                  id="cpf"
                  name="cpf"
                  type="text"
                  inputMode="numeric"
                  value={formData.cpf}
                  onChange={handleChange}
                  placeholder="Somente números"
                />
                {errors.cpf && <span className={styles.errorText}>{errors.cpf}</span>}
              </Field.Root>

              <Field.Root className={styles.field} required>
                <Field.Label>Data de nascimento</Field.Label>
                <Input
                  id="dataNascimento"
                  name="dataNascimento"
                  type="date"
                  value={formData.dataNascimento}
                  onChange={handleChange}
                />
                {errors.dataNascimento && (
                  <span className={styles.errorText}>{errors.dataNascimento}</span>
                )}
              </Field.Root>

              <Field.Root className={styles.field} required>
                <Field.Label>Gênero</Field.Label>
                <Select id="genero" name="genero" value={formData.genero} onChange={handleChange} placeholder="Selecione">
                  {GENEROS.map((opcao) => (
                    <option key={opcao.value} value={opcao.value}>
                      {opcao.label}
                    </option>
                  ))}
                </Select>
                {errors.genero && (
                  <span className={styles.errorText}>{errors.genero}</span>
                )}
              </Field.Root>

              <Field.Root className={styles.field} required>
                <Field.Label>E-mail</Field.Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="voce@exemplo.com"
                />
                {errors.email && (
                  <span className={styles.errorText}>{errors.email}</span>
                )}
              </Field.Root>

              <Field.Root className={styles.field} required>
                <Field.Label>Senha</Field.Label>
                <Input
                  id="senha"
                  name="senha"
                  type="password"
                  autoComplete="new-password"
                  value={formData.senha}
                  onChange={handleChange}
                  placeholder="Mínimo 6 caracteres"
                />
                {errors.senha && (
                  <span className={styles.errorText}>{errors.senha}</span>
                )}
              </Field.Root>

              <Field.Root className={styles.field} required>
                <Field.Label>Confirmar senha</Field.Label>
                <Input
                  id="confirmarSenha"
                  name="confirmarSenha"
                  type="password"
                  autoComplete="new-password"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  placeholder="Repita a senha"
                />
                {errors.confirmarSenha && (
                  <span className={styles.errorText}>{errors.confirmarSenha}</span>
                )}
              </Field.Root>
            </div>

            {submissionError && (
              <AlertRoot status="error" className={styles.feedback}>
                <AlertIndicator />
                {submissionError}
              </AlertRoot>
            )}

            {successMessage && (
              <AlertRoot status="success" className={styles.feedback}>
                <AlertIndicator />
                {successMessage}
              </AlertRoot>
            )}

            <Button type="submit">Cadastrar</Button>
          </form>
        </CardBody>

        <CardFooter justifyContent="center">
          <Text className={styles.registerActions}>
            Já possui conta?{' '}
            <Link as={RouterLink} to="/login">
              Voltar para o login
            </Link>
          </Text>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Cadastro

