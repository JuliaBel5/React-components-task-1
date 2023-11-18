import '../catSearch.css'
import { useState } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../../features/searchResultsSlice'
import { CatItem } from '../CatItem/CatItem'
import { MoonSpinner } from '../MoonSpinner'
import { Pagination } from '../Pagination/Pagination'
import { SearchInput } from '../SearchInput/SearchInput'
import { Select } from '../Select/Select'

export const CatList: React.FC<CatSearchProps> = () => {
  const { searchResults, currentPage, limit, totalPages, isLoading } =
    useAppSelector((state) => state.searchResults)

  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()

  const handleLimitChange = (newLimit: number) => {
    dispatch(searchResultsActions.setLimit(newLimit))
    dispatch(searchResultsActions.setCurrentPage(1))
  }

  const breeds =
    searchResults.length === 0 ? (
      <>
        <h1 className="error-message">nothing found</h1>
      </>
    ) : (
      searchResults.map((cat) => (
        <Link
          key={cat.id}
          data-testid={`cat-${cat.id}`}
          role="link"
          to={`/cat/${cat.id}?${searchParams}`}
        >
          <CatItem cat={cat} />
        </Link>
      ))
    )
  const [error, setError] = useState(false)

  if (error) {
    throw new Error('ММММММММММММММММРРРРР')
  }
  return (
    <div className="search-results">
      <div className="container">
        <div className="error-button" />
        <div>
          <button
            onClick={() => setError(true)}
            className="orange-gradient-button "
          >
            I don't like cats!
          </button>
        </div>
        <SearchInput />
        <div>
          <label htmlFor="limit">Limit:</label>
          <Select value={limit} onChange={handleLimitChange} />
        </div>
        <div className="results-container">
          {isLoading ? <MoonSpinner /> : breeds}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
      </div>
      <div className="card-container">
        <Outlet />
      </div>
    </div>
  )
}

interface CatSearchProps {
  description?: string
  image?: { url: string }
  name?: string
  temperament?: string
  searchTerm?: string
}
