import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import './styles.css'
import App from './App.jsx'
import { UsuarioProvider } from './context/UsuarioContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <UsuarioProvider>
          <App />
        </UsuarioProvider>
      </BrowserRouter>
    </ChakraProvider>
  </StrictMode>,
)
