import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


const modalRoot = document.getElementById("root") as HTMLElement
ReactDOM.createRoot(modalRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
