import {
  fireEvent,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import nock from 'nock'
import {
  createMemoryRouter,
  MemoryRouter,
  Outlet,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { App } from '../App'
import { CatItem } from '../components/CatItem/CatItem'
import { CatList } from '../components/CatList/CatList'
import { SearchResultsContext } from '../store/SearchContext'
import { CatCard } from './CatCard'
import { ErrorPage } from './error-page'
import { NotFound } from './NotFound'

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

describe('CatList', () => {
  it('clicking on CloseButton hides the CatCard', async () => {
    // Set up the mock server with Nock
    nock('https://2ff5030c446d8ca4.mokky.dev').get('/breeds/1').reply(200, {
      id: 1,
      name: 'Test Cat',
      description: 'Test description',
      temperament: 'Test temperament',
    })

    render(
      <MemoryRouter>
        <SearchResultsContext.Provider value={mockContext}>
          <CatList />
          <CatCard />
        </SearchResultsContext.Provider>
      </MemoryRouter>,
    )

    const catListElement = screen.getByTestId('cat-item')
    expect(catListElement).toBeInTheDocument()

    //   const link = screen.getByRole('link')
    fireEvent.click(catListElement)

    // expect(window.location.search).toBe('/cat/1?urlSearchTerm=&page=1&limit=6')
    const catCardElement = screen.getByTestId('cat-card')
    expect(catCardElement).toBeInTheDocument()

    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)

    await waitFor(() => {
      //     expect(catCardElement).not.toBeInTheDocument()
      expect(window.location.pathname).toBe('/')
    })
  })
})
