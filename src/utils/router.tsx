import { createMemoryRouter } from 'react-router-dom'
import { App } from '../App'
import { CatCard } from '../routes/CatCard'
import { ErrorPage } from '../routes/error-page'
import { NotFound } from '../routes/NotFound'

export const router = createMemoryRouter([
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
