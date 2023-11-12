import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { App } from './App'
import { ErrorBoundary } from './components/ErrorBoundary'
import { CatCard } from './routes/CatCard'
import { ErrorPage } from './routes/error-page'
import { NotFound } from './routes/NotFound'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'cat/:catId',
        element: <CatCard />,
      },
    ],
  },
  { path: '*', element: <NotFound /> },
])

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>,
)
