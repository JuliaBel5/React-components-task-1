/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CatService } from '../../services/CatService'
import {
  SearchDataContext,
  SearchResultsContext,
} from '../../store/SearchContext'

const catCard = new CatService()

export const SearchInput: React.FC<object> = () => {
  const { searchTerm, setSearchTerm } = useContext(SearchDataContext)
  const {
    setSearchResults,
    currentPage,
    setCurrentPage,

    setTotalPages,

    setIsLoading,
    limit,
  } = useContext(SearchResultsContext)
  const [_searchParams, setSearchParams] = useSearchParams()

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

  const handleSearchInputChange = (event: { target: { value: string } }) => {
    setSearchTerm(event.target.value)
  }
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

  return (
    <div className="input-container">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Please, enter a cat breed"
        className="input-field"
      />
      <button onClick={handleSearchButtonClick} className="gradient-button">
        Search
      </button>
    </div>
  )
}
