/* eslint-disable @typescript-eslint/no-unused-vars */
import './catSearch.css'
import { useEffect, useState } from 'react'
import { Link, Outlet, useSearchParams } from 'react-router-dom'
import { CatBreed, CatService } from '../services/CatService'
import { CatItem } from './CatItem'
import { MoonSpinner } from './MoonSpinner'
import { Pagination } from './Pagination'
import { SearchInput } from './SearchInput'
import { Select } from './Select'

const catCard = new CatService()

export const CatList: React.FC<CatSearchProps> = () => {
  const [searchTerm, setSearchTerm] = useState<string>(
    localStorage.getItem('searchTerm') ?? '',
  )
  const [searchResults, setSearchResults] = useState<CatBreed[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [limit, setLimit] = useState<number>(6)

  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setSearchParams({
      urlSearchTerm: searchTerm.trim(),
      page: currentPage.toString(),
      limit: limit.toString(),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit])

  useEffect(() => {
    searchCat({ page: currentPage, limit })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, limit])

  const handleSearchButtonClick = () => {
    localStorage.setItem('searchTerm', searchTerm.trim())
    setCurrentPage(1)
    setSearchParams({
      urlSearchTerm: searchTerm.trim(),
      page: currentPage.toString(),
      limit: limit.toString(),
    })

    searchCat({ breed: searchTerm.trim(), limit })
  }

  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') handleSearchButtonClick()
  }

  const handleSearchInputChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value)
  }

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
  const searchCat = async ({
    page = 1,
    breed = searchTerm.trim(),
    limit = 6,
  } = {}) => {
    setIsLoading(true)
    const response = await catCard.getCats({ breed, page, limit })

    setSearchResults(response.items)
    setTotalPages(response.meta.total_pages)
    setIsLoading(false)
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
        <SearchInput
          searchTerm={searchTerm}
          handleSearchInputChange={handleSearchInputChange}
          handleSearchButtonClick={handleSearchButtonClick}
          handleKeyPress={handleKeyPress}
        />
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
