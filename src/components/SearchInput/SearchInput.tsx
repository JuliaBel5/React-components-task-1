import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCats } from '../../features/catSlice'
import {
  searchResultsActions,
  useAppDispatch,
  useAppSelector,
} from '../../features/searchResultsSlice'
import { searchActions } from '../../features/searchSlice'
import { NotFound } from '../../routes/NotFound'
import { MoonSpinner } from '../MoonSpinner'

export const SearchInput: React.FC<object> = () => {
  const { searchTerm } = useAppSelector((state) => state.search)
  const { currentPage, limit } = useAppSelector((state) => state.searchResults)
  const { status } = useAppSelector((state) => state.cats)

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
    dispatch(getCats({ page: currentPage, limit }))
  }, [currentPage, dispatch, limit])

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

    //searchCat({ breed: searchTerm.trim(), limit })
    dispatch(getCats({ breed: searchTerm.trim(), limit }))
  }
  const handleKeyPress = (event: { key: string }) => {
    if (event.key === 'Enter') handleSearchButtonClick()
  }

  if (status === 'failed') {
    return <NotFound />
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
