import { act, render, screen } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { Pagination } from './Pagination'

// Custom hook to access the location object
function TestComponent() {
  const location = useLocation()
  return <div data-testid="location">{location.search}</div>
}

describe('Pagination', () => {
  it('should update URL query parameter when page changes', () => {
    render(
      <MemoryRouter initialEntries={['/?urlSearchTerm=&page=4&limit=6']}>
        <Pagination currentPage={4} totalPages={5} />
        <TestComponent />
      </MemoryRouter>,
    )

    // Find the pagination buttons
    const prevButton = screen.getByRole('button', { name: '«' })
    const nextButton = screen.getByRole('button', { name: '»' })

    // Click on the next button
    act(() => {
      nextButton.click()
    })

    // Get the location element to check the updated query parameter
    const locationElement = screen.getByTestId('location')

    // Check if the searchParams are updated correctly
    expect(locationElement.textContent).toBe('?urlSearchTerm=&page=5&limit=6')

    // Click on the previous button
    act(() => {
      prevButton.click()
    })

    // Check if the searchParams are updated correctly
    expect(locationElement.textContent).toBe('?urlSearchTerm=&page=3&limit=6')
  })
})
