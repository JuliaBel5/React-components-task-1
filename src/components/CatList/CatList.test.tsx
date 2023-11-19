import { render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { beforeEach, describe, it } from 'vitest'
import { catApi } from '../../services/catApi'
import { store } from '../../store/store'
import { router } from '../../utils/router'

const mockItems = [
  {
    id: 1,
    name: 'Test Cat 1',
    description: 'Test description 1',
    temperament: 'Test temperament 1',
  },
  {
    id: 2,
    name: 'Test Cat 2',
    description: 'Test description 2',
    temperament: 'Test temperament 2',
  },
]

describe('CatList', () => {
  beforeEach(() => {
    store.dispatch(catApi.util.resetApiState())
  })
  it('Check that an appropriate message is displayed if no cards are present', async () => {
    nock('https://2ff5030c446d8ca4.mokky.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/breeds?name=*&page=1&limit=6')
      .reply(200, {
        meta: {
          total_items: 0,
          total_pages: 1,
          current_page: 1,
          per_page: 6,
          remaining_count: 0,
        },
        items: [],
      })

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    )

    // checking the presence of the error message
    await waitFor(async () => {
      expect(screen.getByText('nothing found')).toBeInTheDocument()
    })
  })

  it('verifies that the component renders the specified number of cards', async () => {
    nock('https://2ff5030c446d8ca4.mokky.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/breeds?name=*&page=1&limit=6')
      .reply(200, {
        meta: {
          total_items: 67,
          total_pages: 12,
          current_page: 1,
          per_page: 6,
          remaining_count: 61,
        },
        items: mockItems,
      })

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    )

    // Verify the length of the data array
    test('verifies the length of the data array', () => {
      expect(mockItems).toHaveLength(2)
    })

    // Verify the number of CatItems displayed

    await waitFor(async () => {
      const catItems = screen.getAllByTestId('cat-item')
      expect(catItems).toHaveLength(2)
    })
  })
})
