const LOCAL_STORAGE_KEY = 'usuariosRegistrados'

function parseUsuarios(dadosBrutos) {
  const usuarios = JSON.parse(dadosBrutos)
  return Array.isArray(usuarios) ? usuarios : []
}

function getUsuariosRegistrados() {
  try {
    const dados = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!dados) {
      return []
    }
    return parseUsuarios(dados)
  } catch {
    return []
  }
}

function saveUsuariosRegistrados(usuarios) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(usuarios))
}

export { LOCAL_STORAGE_KEY, getUsuariosRegistrados, saveUsuariosRegistrados }

