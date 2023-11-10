import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { expect, test } from 'vitest'
import { SearchInput } from './SearchInput'

test('should save entered value to local storage on Search button click', () => {
  // Render the component
  render(
    <MemoryRouter>
      <SearchInput />
    </MemoryRouter>,
  )

  // Get the search input and search button
  const searchInput = screen.getByPlaceholderText('Please, enter a cat breed')
  const searchButton = screen.getByText('Search')

  // Enter a value in the search input
  const enteredValue = 'Persian'
  fireEvent.change(searchInput, { target: { value: enteredValue } })

  // Click the search button
  fireEvent.click(searchButton)

  // Assert that the entered value is saved to local storage
  expect(localStorage.getItem('searchTerm')).toBe(enteredValue)
})

test('should render the input field and button', () => {
  const { getByPlaceholderText, getByText } = render(
    <MemoryRouter>
      <SearchInput />
    </MemoryRouter>,
  )

  const inputField = getByPlaceholderText('Please, enter a cat breed')
  const searchButton = getByText('Search')

  expect(inputField).toBeInTheDocument()
  expect(searchButton).toBeInTheDocument()
})
