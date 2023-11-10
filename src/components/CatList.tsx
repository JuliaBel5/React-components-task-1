import './catSearch.css'
import { useContext, useState } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import { SearchDataContext, SearchResultsContext } from '../store/SearchContext'
import { CatItem } from './CatItem'
import { MoonSpinner } from './MoonSpinner'
import { Pagination } from './Pagination'
import { SearchInput } from './SearchInput/SearchInput'
import { Select } from './Select/Select'

export const CatList: React.FC<CatSearchProps> = () => {
  const { searchTerm } = useContext(SearchDataContext)
  const {
    searchResults,
    currentPage,
    setCurrentPage,
    totalPages,
    isLoading,
    limit,
    setLimit,
  } = useContext(SearchResultsContext)

  const [searchParams, setSearchParams] = useSearchParams()

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setSearchParams({
      urlSearchTerm: searchTerm.trim(),
      page: page.toString(),
      limit: limit.toString(),
    })
  }
  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    setCurrentPage(1)
  }

  const breeds =
    searchResults.length === 0 ? (
      <>
        <h1 className="error-message">nothing found</h1>
      </>
    ) : (
      searchResults.map((cat) => (
        <Link key={cat.id} to={`/cat/${cat.id}?${searchParams}`}>
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
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
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
