import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Cadastro from './pages/Cadastro.jsx'
import Home from './pages/Home.jsx'
import Perfil from './pages/Perfil.jsx'
import BuscarTerapeutas from './pages/BuscarTerapeutas.jsx'
import ConsultarAgendamentos from './pages/ConsultarAgendamentos.jsx'
import SolicitarReembolso from './pages/SolicitarReembolso.jsx'
import MeusPacientes from './pages/MeusPacientes.jsx'
import Login from './pages/Login.jsx'
import { useUsuario } from './context/UsuarioContext.jsx'

function App() {
  const { usuario } = useUsuario()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route
        path="/home"
        element={usuario ? <Home /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/perfil"
        element={usuario ? <Perfil /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/buscar-terapeutas"
        element={usuario ? <BuscarTerapeutas /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/consultar-agendamentos"
        element={usuario ? <ConsultarAgendamentos /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/meus-pacientes"
        element={usuario ? <MeusPacientes /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/solicitar-reembolso"
        element={usuario ? <SolicitarReembolso /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/"
        element={<Navigate to={usuario ? '/home' : '/login'} replace />}
      />
      <Route
        path="*"
        element={<Navigate to={usuario ? '/home' : '/login'} replace />}
      />
    </Routes>
  )
}

export default App
