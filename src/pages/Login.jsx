import { Link as RouterLink } from 'react-router-dom'
import {
  AlertIndicator,
  AlertRoot,
  CardBody,
  CardFooter,
  CardHeader,
  Field,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import styles from './Login.module.css'
import { useLoginForm } from '../hooks/useLoginForm.js'
import MindCareLogo from '../assets/MindCare.png'
import { Button } from '../components/Button.jsx'
import { Input } from '../components/Input.jsx'
import { Link } from '../components/Link.jsx'
import { Heading1 } from '../components/Heading1.jsx'
import { Card } from '../components/Card.jsx'
import { Logo } from '../components/Logo.jsx'

function Login() {
  const {
    username,
    senha,
    erro,
    carregando,
    handleUsernameChange,
    handleSenhaChange,
    handleSubmit,
  } = useLoginForm()

  return (
    <main className={styles.loginPage}>
      <Card as="section">
        <CardHeader className={styles.loginHeader}>
          <Logo className={styles.logo} />
          <Heading1>
            Entre na sua conta
          </Heading1>
          <Text className={styles.loginSignup}>
            Ainda não possui cadastro?{' '}
            <Link as={RouterLink} to="/cadastro">
              Crie sua conta
            </Link>
          </Text>
        </CardHeader>

        <CardBody>
          <Stack
            as="form"
            onSubmit={handleSubmit}
            gap={4}
          >
            <Field.Root gap={1} required>
              <Field.Label>Usuário ou e-mail</Field.Label>
              <Input
                name="username"
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Digite seu usuário ou e-mail"
                autoComplete="username"
              />
            </Field.Root>

            <Field.Root gap={1} required>
              <Field.Label>Senha</Field.Label>
              <Input
                name="password"
                type="password"
                value={senha}
                onChange={handleSenhaChange}
                placeholder="Digite sua senha"
                autoComplete="current-password"
              />
            </Field.Root>

            <Button type="submit" isLoading={carregando} loadingText="Entrando...">
              Entrar
            </Button>
          </Stack>

          {erro && (
            <AlertRoot status="error" className={styles.loginError}>
              <AlertIndicator />
              {erro}
            </AlertRoot>
          )}
        </CardBody>

        <CardFooter justifyContent="center">
          <Link as={RouterLink} to="">
            Esqueceu sua senha?
          </Link>
        </CardFooter>
      </Card>
    </main>
  )
}

export default Login

