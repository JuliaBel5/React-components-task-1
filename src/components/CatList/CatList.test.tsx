import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import nock from 'nock'
import { MemoryRouter } from 'react-router-dom'
import { SearchResultsContext } from '../../store/SearchContext'
import { CatList } from './CatList'

describe('CatList', () => {
  it('displays an appropriate message if no cards are present', () => {
    render(
      <MemoryRouter>
        <CatList />
      </MemoryRouter>,
    )

    // Assert on the presence of the error message
    expect(screen.getByText('nothing found')).toBeInTheDocument()
  })
})

describe('expectedData', () => {
  it('checks if returned data from API rendered into component', async () => {
    const mockContext = {
      searchResults: [
        {
          id: '1',
          name: 'Test Cat',
          description: 'Test description',
          temperament: 'Test temperament',
        },
      ],
      setSearchResults: () => {},
      currentPage: 1,
      setCurrentPage: () => {},
      totalPages: 2,
      setTotalPages: () => {},
      isLoading: false,
      setIsLoading: () => {},
      limit: 6,
      setLimit: () => {},
      cat: {
        id: '1',
        name: 'Test Cat',
        description: 'Test description',
        temperament: 'Test temperament',
      },
      setCat: () => {},
    }
    nock('https://api.fake-rest.refine.dev')
      .defaultReplyHeaders({
        'access-control-allow-origin': '*',
      })
      .get('/cat/1')
      .reply(200, {
        id: 1,
        description: 'blabla',
        temperament: 'bla',
      })

    render(
      <MemoryRouter>
        <SearchResultsContext.Provider value={mockContext}>
          <CatList />
        </SearchResultsContext.Provider>
      </MemoryRouter>,
    )
    const catItem = screen.getByTestId('cat-item')

    fireEvent.click(catItem)
    await waitFor(() => {
      expect(screen.getByText('Test Cat')).toBeInTheDocument()
    })
  })
})
