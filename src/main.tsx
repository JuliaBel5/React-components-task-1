import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ErrorBoundary } from './components/ErrorBoundary'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      fallback={
        <div className="error">
          Something went wrong. Please, reload the page
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
