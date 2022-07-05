import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import AuthenticationProvider from "./components/AuthenticationProvider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthenticationProvider>
      <App/>
    </AuthenticationProvider>
  </React.StrictMode>
)
