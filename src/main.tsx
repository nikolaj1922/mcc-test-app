import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { TreeContextProvider } from './context/TreeContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TreeContextProvider>
      <App />
    </TreeContextProvider>
  </React.StrictMode>
)
