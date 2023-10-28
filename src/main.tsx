import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ErrorBoundary } from 'react-error-boundary'
import { App } from './App'

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
