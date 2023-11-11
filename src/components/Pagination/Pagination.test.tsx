import { act, render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { App } from '../../App'
import { CatCard } from '../../routes/CatCard'
import { ErrorPage } from '../../routes/error-page'
import { NotFound } from '../../routes/NotFound'

describe('Pagination', () => {
  it('should update URL query parameter when page changes', () => {
    const router = createMemoryRouter([
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

    render(<RouterProvider router={router} />)

    // Find the pagination buttons
    const prevButton = screen.getByRole('button', { name: '«' })
    const nextButton = screen.getByRole('button', { name: '»' })

    // Click on the next button
    act(() => {
      nextButton.click()
    })

    // Check if the searchParams are updated correctly
    expect(router.state.location.search).toBe('?urlSearchTerm=&page=2&limit=6')

    // Click on the previous button
    act(() => {
      prevButton.click()
    })

    // Check if the searchParams are updated correctly
    expect(router.state.location.search).toBe('?urlSearchTerm=&page=1&limit=6')
  })
})
