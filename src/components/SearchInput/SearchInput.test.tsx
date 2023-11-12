import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, RouterProvider } from 'react-router-dom'
import { expect, test } from 'vitest'
import { router } from '../../utils/router'
import { SearchInput } from './SearchInput'

test('should save entered value to local storage on Search button click', () => {
  render(<RouterProvider router={router} />)

  const searchInput = screen.getByPlaceholderText('Please, enter a cat breed')
  const searchButton = screen.getByText('Search')

  // Enter a value in the search input
  const enteredValue = 'Persian'
  fireEvent.change(searchInput, { target: { value: enteredValue } })

  fireEvent.click(searchButton)

  // Verify that the entered value is saved to local storage
  expect(localStorage.getItem('searchTerm')).toBe(enteredValue)
})

test('should retrieve value from local storage upon mounting', () => {
  // Set up the local storage with a test value
  localStorage.setItem('searchTerm', 'test value')

  render(<RouterProvider router={router} />)

  // Assert that the component retrieves the value from local storage
  expect(screen.getByPlaceholderText('Please, enter a cat breed')).toHaveValue(
    'test value',
  )
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
