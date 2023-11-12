import { render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import { MemoryRouter, RouterProvider } from 'react-router-dom'
import { router } from '../../utils/router'
import { CatList } from './CatList'

describe('CatList', () => {
  it('Check that an appropriate message is displayed if no cards are present', () => {
    render(
      <MemoryRouter>
        <CatList />
      </MemoryRouter>,
    )

    // checking the presence of the error message
    expect(screen.getByText('nothing found')).toBeInTheDocument()
  })

  it('verifies that the component renders the specified number of cards', async () => {
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

    render(<RouterProvider router={router} />)

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
