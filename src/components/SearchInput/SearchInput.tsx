import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../../features/searchResultsSlice'
import { searchActions } from '../../features/searchSlice'
import { CatService } from '../../services/CatService'

const catCard = new CatService()

export const SearchInput: React.FC<object> = () => {
  const { searchTerm } = useAppSelector((state) => state.search)
  const { currentPage, limit } = useAppSelector((state) => state.searchResults)
  const dispatch = useAppDispatch()

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
    dispatch(searchActions.setSearchTerm(event.target.value))
  }
  const handleSearchButtonClick = () => {
    localStorage.setItem('searchTerm', searchTerm.trim())
    dispatch(searchResultsActions.setCurrentPage(1))
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
    dispatch(searchResultsActions.setIsLoading(true))
    const response = await catCard.getCats({ breed, page, limit })

    dispatch(searchResultsActions.setSearchResults(response.items))

    dispatch(searchResultsActions.setTotalPages(response.meta.total_pages))
    dispatch(searchResultsActions.setIsLoading(false))
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
