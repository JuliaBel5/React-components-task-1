import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { App } from '../App'
import { CatCard } from './CatCard'
import { ErrorPage } from './error-page'
import { NotFound } from './NotFound'

test('404 page is displayed for invalid route', () => {
  const router = createMemoryRouter(
    [
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
    ],

    { initialEntries: ['/some/bad/route'] },
  )

  render(<RouterProvider router={router} />)

  expect(screen.getByText('nothing found')).toBeInTheDocument()
})
