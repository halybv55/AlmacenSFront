import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AppInventarioEntrada from './AppInventarioEntrada'
import DevolucionProductoPage from './DevolucionProductoPage'
import CargaProductoPage from './CargaProductoPage'


ReactDOM.createRoot(document.getElementById('root')!).render(
<React.StrictMode>
<App />
<AppInventarioEntrada></AppInventarioEntrada>
<DevolucionProductoPage></DevolucionProductoPage>
<CargaProductoPage></CargaProductoPage>
</React.StrictMode>
)