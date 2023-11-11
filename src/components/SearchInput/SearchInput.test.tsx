import { fireEvent, render, screen } from '@testing-library/react'
import {
  createMemoryRouter,
  MemoryRouter,
  RouterProvider,
} from 'react-router-dom'
import { expect, test } from 'vitest'
import { App } from '../../App'
import { CatCard } from '../../routes/CatCard'
import { ErrorPage } from '../../routes/error-page'
import { NotFound } from '../../routes/NotFound'
import { SearchInput } from './SearchInput'

test('should save entered value to local storage on Search button click', () => {
  // Render the component
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
