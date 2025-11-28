import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const UsuarioContext = createContext(undefined)

function UsuarioProvider({ children }) {
  const [usuario, setUsuario] = useState(null)

  const login = useCallback((dadosUsuario) => {
    setUsuario(dadosUsuario)
  }, [])

  const logout = useCallback(() => {
    setUsuario(null)
  }, [])

  const value = useMemo(
    () => ({
      usuario,
      login,
      logout,
    }),
    [usuario, login, logout],
  )

  return <UsuarioContext.Provider value={value}>{children}</UsuarioContext.Provider>
}

function useUsuario() {
  const context = useContext(UsuarioContext)
  if (!context) {
    return {
      usuario: null,
      login: () => {},
      logout: () => {},
    }
  }
  return context
}

export { UsuarioProvider, useUsuario }

