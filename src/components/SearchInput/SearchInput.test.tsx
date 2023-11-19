import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { expect, test } from 'vitest'
import { store } from '../../store/store'
import { router } from '../../utils/router'

test('should save entered value to local storage on Search button click', () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )

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
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )

  // Verify that the component retrieves the value from local storage
  expect(screen.getByPlaceholderText('Please, enter a cat breed')).toHaveValue(
    'Persian',
  )
})

test('should render the input field and button', async () => {
  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>,
  )

  const inputField = screen.getByPlaceholderText('Please, enter a cat breed')
  const searchButton = screen.getByText('Search')

  await waitFor(async () => {
    expect(inputField).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })
})
