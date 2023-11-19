import { act, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { store } from '../../store/store'
import { router } from '../../utils/router'

describe('Pagination', () => {
  it('should update URL query parameter when page changes', () => {
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    )

    const prevButton = screen.getByRole('button', { name: '«' })
    const nextButton = screen.getByRole('button', { name: '»' })

    act(() => {
      nextButton.click()
    })

    // Checks if the searchParams are updated correctly
    expect(router.state.location.search).toBe('?urlSearchTerm=&page=2&limit=6')

    act(() => {
      prevButton.click()
    })

    // Checks if the searchParams are updated correctly
    expect(router.state.location.search).toBe('?urlSearchTerm=&page=1&limit=6')
  })
})
